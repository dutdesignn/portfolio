/* Construit les cartes, le diaporama d'accueil et la fiche projet à partir de js/projets.js */

/* ---------- Emplacements d'image ou de vidéo ----------
   Chaque visuel est dans un conteneur .emplacement. Le format n'a pas d'importance :
   pour "lfl.jpg", le site essaie lfl.jpg, .png, .jpeg, .webp, puis les vidéos lfl.mp4, .webm, .mov.
   Le premier fichier trouvé s'affiche. Si aucun n'existe, le conteneur reçoit la classe "vide"
   et affiche le nom attendu à la place. */
const EXT_IMAGES = ['.jpg', '.png', '.jpeg', '.webp'];
const EXT_VIDEOS = ['.mp4', '.webm', '.mov'];

function sansExtension(chemin) {
  return chemin.replace(/\.(jpe?g|png|webp|mp4|webm|mov)$/i, '');
}

// Variantes d'image d'un chemin, la version écrite dans projets.js en premier
function variantes(chemin) {
  const base = sansExtension(chemin);
  const liste = EXT_IMAGES.map((ext) => base + ext);
  return [chemin, ...liste.filter((c) => c !== chemin)];
}

/* ---------- Lecture des vidéos ----------
   Une vidéo ne joue que lorsqu'elle est visible à l'écran (au moins à moitié).
   Ça vaut pour toutes les vidéos : accueil, cartes, fenêtre projet, portrait.
   Une diapo cachée sur le côté d'un diaporama compte comme invisible.
   Si le visiteur met lui-même une vidéo en pause, elle ne repart pas toute seule. */
const SEUIL_VISIBLE = 0.5;

const observateurVideos = new IntersectionObserver((entrees) => {
  entrees.forEach(({ target: video, isIntersecting, intersectionRatio }) => {
    video.visible = isIntersecting && intersectionRatio >= SEUIL_VISIBLE;
    actualiserVideo(video);
  });
}, { threshold: [0, SEUIL_VISIBLE] });

function actualiserVideo(video) {
  // Fenêtre projet ouverte : les vidéos de la page derrière sont cachées
  const ficheOuverte = document.getElementById('fiche').open;
  const cachee = ficheOuverte && !video.closest('#fiche');
  if (video.visible && !cachee && !document.hidden && !video.pauseVisiteur) {
    if (video.paused) video.play().catch(() => {});
  } else if (!video.paused) {
    video.pauseAuto = true; // pause décidée par le site, pas par le visiteur
    video.pause();
  }
}

// Onglet en arrière-plan : tout s'arrête ; retour sur l'onglet : les vidéos visibles repartent
document.addEventListener('visibilitychange', () => {
  document.querySelectorAll('video').forEach(actualiserVideo);
});

// Image d'aperçu d'une vidéo (ex. 1.mp4 -> 1.apercu.jpg), créée par outils/Optimiser les images.command.
// Elle s'affiche pendant que la vidéo charge.
function apercuDe(src) {
  return `${sansExtension(src)}.apercu.jpg`;
}

// Vidéo en boucle, sans son au départ (obligatoire pour la lecture automatique)
function creerVideo(controles) {
  const video = document.createElement('video');
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = 'metadata';
  video.controls = controles; // dans la fiche : barre de lecture pour mettre le son
  video.addEventListener('pause', () => {
    if (!video.pauseAuto) video.pauseVisiteur = true;
    video.pauseAuto = false;
  });
  video.addEventListener('play', () => { video.pauseVisiteur = false; });
  return video;
}

// Essaie les vidéos une par une ; remplace l'image par la première qui existe
function essayerVideos(conteneur, img, essais, controles) {
  const src = essais.shift();
  if (!src) {
    conteneur.classList.add('vide');
    return;
  }
  const video = creerVideo(controles);
  video.poster = apercuDe(src);
  video.addEventListener('loadedmetadata', () => {
    img.replaceWith(video);
    conteneur.classList.remove('vide');
    observateurVideos.observe(video); // elle démarrera quand elle sera visible
  }, { once: true });
  video.addEventListener('error', () => essayerVideos(conteneur, img, essais, controles), { once: true });
  video.src = src;
}

function surveillerImage(conteneur, { controles = false } = {}) {
  const img = conteneur.querySelector('img');
  const original = img.getAttribute('src');
  const essais = variantes(original);
  conteneur.dataset.fichier = `${sansExtension(original)} (.jpg, .png ou .mp4)`;
  essais.shift(); // le premier est déjà en cours de chargement

  const essaiSuivant = () => {
    const suivant = essais.shift();
    // Le premier essai a déjà eu lieu : on charge les suivants tout de suite
    // (sinon le navigateur peut les laisser en attente indéfiniment)
    img.loading = 'eager';
    if (suivant) img.src = suivant;
    else essayerVideos(conteneur, img, EXT_VIDEOS.map((ext) => sansExtension(original) + ext), controles);
  };
  img.addEventListener('error', essaiSuivant);
  img.addEventListener('load', () => conteneur.classList.remove('vide'));
  // Image déjà en échec avant qu'on l'écoute : on passe au format suivant.
  // (Une image "lazy" pas encore chargée se dit aussi "complete" : on attend simplement ses événements.)
  if (img.complete && img.naturalWidth === 0 && img.loading !== 'lazy') essaiSuivant();
}

function creerEmplacement(src, alt = '', options = {}) {
  const conteneur = document.createElement('div');
  conteneur.className = 'emplacement';
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.loading = 'lazy';
  conteneur.append(img);
  surveillerImage(conteneur, options);
  return conteneur;
}

document.querySelectorAll('.emplacement').forEach((conteneur) => surveillerImage(conteneur));

/* ---------- Cartes projet ---------- */
const gabarit = document.getElementById('gabarit-carte');
const CATEGORIES = { 'design-graphique': 'Design graphique', 'motion-design': 'Motion design', 'creation-3d': 'Création 3D' };

document.querySelectorAll('.galerie__grille').forEach((grille) => {
  (CARTES[grille.dataset.categorie] || []).forEach((carte) => {
    const el = gabarit.content.firstElementChild.cloneNode(true);
    const media = el.querySelector('.carte__media');
    const img = media.querySelector('img');
    img.src = carte.vignette;
    img.loading = 'lazy';
    // Texte de l'image, lu par Google Images et les lecteurs d'écran
    img.alt = `${carte.titre} — ${CATEGORIES[grille.dataset.categorie] || 'projet'} par Antonin Dutartre`;
    surveillerImage(media);

    el.querySelector('.carte__annee').textContent = carte.annee;
    el.querySelector('.carte__titre').textContent = carte.titre;
    el.querySelector('.carte__desc').textContent = carte.resume;
    if (carte.titre.length >= 20) el.classList.add('carte--titre-long');

    if (carte.fiche && FICHES[carte.fiche]) {
      el.addEventListener('click', () => ouvrirFiche(carte.fiche));
    } else {
      // Pas de fiche détaillée : la carte n'est pas cliquable
      el.disabled = true;
      el.classList.add('carte--statique');
    }
    grille.append(el);
  });
});

/* ---------- Liste des projets pour Google ----------
   Générée à partir de js/projets.js : elle reste à jour quand tu ajoutes ou retires un projet. */
(() => {
  const auteur = { '@id': 'https://dut-designn.com/#antonin' };
  const projets = [];
  Object.entries(CARTES).forEach(([categorie, cartes]) => cartes.forEach((carte) => {
    const fiche = carte.fiche && FICHES[carte.fiche];
    projets.push({
      '@type': 'CreativeWork',
      name: carte.titre,
      genre: CATEGORIES[categorie],
      description: carte.resume,
      ...(fiche ? { abstract: fiche.description[0] } : {}),
      dateCreated: carte.annee,
      creator: auteur,
      inLanguage: 'fr-FR',
    });
  }));
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Projets d’Antonin Dutartre (DUT.)',
    itemListElement: projets.map((item, i) => ({ '@type': 'ListItem', position: i + 1, item })),
  });
  document.head.append(script);
})();

/* ---------- Diaporama de l'accueil ---------- */
const vitrine = document.getElementById('vitrine');
ACCUEIL.forEach((src, i) => {
  const diapo = creerEmplacement(src, `Projet à la une ${i + 1}`);
  diapo.classList.add('vitrine__diapo');
  vitrine.append(diapo);
});

let indexVitrine = 0;
function allerVitrine(index) {
  const total = ACCUEIL.length;
  indexVitrine = (index + total) % total;
  vitrine.style.transform = `translateX(-${indexVitrine * 100}%)`;
}
document.querySelector('[data-vitrine="suivant"]').addEventListener('click', () => allerVitrine(indexVitrine + 1));
document.querySelector('[data-vitrine="precedent"]').addEventListener('click', () => allerVitrine(indexVitrine - 1));

/* ---------- Fiche projet ---------- */
const fiche = document.getElementById('fiche');
const ficheDiapos = document.getElementById('fiche-diapos');
let indexFiche = 0;
let totalFiche = 0;

const ficheGalerie = document.querySelector('.fiche__galerie');

/* Pages de la fenêtre projet
   Chaque projet a un dossier par page : images/projets/<projet>/1/, 2/, 3/…
   Dans chaque dossier, les visuels s'appellent 1, 2, 3… (tous les formats acceptés).
   Le site les cherche dans l'ordre et s'arrête au premier numéro manquant.
   Un dossier vide = page non affichée. */
const PAGES_PAR_DEFAUT = 3;
const MAX_VISUELS_PAR_PAGE = 12;
const MARGE = 24; // entre les visuels et autour, en pixels

function chargerImage(src) {
  return new Promise((ok) => {
    const img = new Image();
    img.onload = () => ok({ type: 'image', src, ratio: img.naturalWidth / img.naturalHeight });
    img.onerror = () => ok(null);
    img.src = src;
  });
}

function chargerVideo(src) {
  return new Promise((ok) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    video.onloadedmetadata = () => ok({ type: 'video', src, ratio: video.videoWidth / video.videoHeight || 16 / 9 });
    video.onerror = () => ok(null);
    video.src = src;
  });
}

// Essaie tous les formats d'un visuel en même temps, garde le premier trouvé (images d'abord)
async function trouverVisuel(base) {
  const essais = [...EXT_IMAGES.map((ext) => chargerImage(base + ext)), ...EXT_VIDEOS.map((ext) => chargerVideo(base + ext))];
  const resultats = await Promise.all(essais);
  return resultats.find(Boolean) || null;
}

// Résultat gardé en mémoire : on ne cherche les fichiers qu'une fois par projet
const pagesTrouvees = new Map();
function pagesDuProjet(id) {
  if (!pagesTrouvees.has(id)) {
    const nombre = FICHES[id].pages || PAGES_PAR_DEFAUT;
    const recherche = Promise.all(Array.from({ length: nombre }, async (_, p) => {
      const visuels = [];
      for (let i = 1; i <= MAX_VISUELS_PAR_PAGE; i++) {
        const visuel = await trouverVisuel(`images/projets/${id}/${p + 1}/${i}`);
        if (!visuel) break;
        visuels.push(visuel);
      }
      return visuels;
    })).then((pages) => pages.filter((visuels) => visuels.length));
    pagesTrouvees.set(id, recherche);
  }
  return pagesTrouvees.get(id);
}

/* Mise en page d'une page : les visuels sont rangés en rangées, dans l'ordre.
   Dans une rangée, ils ont tous la même hauteur ; chaque rangée occupe toute la largeur.
   On essaie toutes les façons de couper en rangées et on garde celle où les visuels
   sont les plus grands. La zone prend alors exactement la taille du résultat :
   aucun recadrage, aucun vide, 24 px partout. */
function calculerMiseEnPage(ratios, largeurMax, hauteurMax) {
  const n = ratios.length;
  let meilleure = null;
  for (let coupes = 0; coupes < 2 ** (n - 1); coupes++) {
    const rangees = [];
    let debut = 0;
    for (let i = 0; i < n; i++) {
      if (i === n - 1 || (coupes >> i) & 1) {
        rangees.push(ratios.slice(debut, i + 1));
        debut = i + 1;
      }
    }
    const sommes = rangees.map((r) => r.reduce((a, b) => a + b, 0));
    const espaces = rangees.map((r) => (r.length - 1) * MARGE);
    const fixe = 2 * MARGE + (rangees.length - 1) * MARGE;
    const hauteurPour = (l) => sommes.reduce((h, s, j) => h + (l - espaces[j]) / s, fixe);

    // Largeur utile : toute la place, ou moins si ça dépasse en hauteur
    let largeur = largeurMax - 2 * MARGE;
    if (hauteurPour(largeur) > hauteurMax) {
      const a = sommes.reduce((t, s) => t + 1 / s, 0);
      const b = sommes.reduce((t, s, j) => t + espaces[j] / s, 0);
      largeur = (hauteurMax - fixe + b) / a;
    }
    if (espaces.some((e) => largeur - e <= 0)) continue;

    const hauteurs = sommes.map((s, j) => (largeur - espaces[j]) / s);
    const aire = hauteurs.reduce((t, h, j) => t + h * (largeur - espaces[j]), 0);
    if (!meilleure || aire > meilleure.aire * 1.0001) {
      meilleure = { aire, largeur: largeur + 2 * MARGE, hauteur: hauteurPour(largeur), rangees, hauteurs };
    }
  }
  return meilleure;
}

// Place chaque visuel au pixel près dans sa page
function disposerPage(page, largeurMax, hauteurMax) {
  const mise = calculerMiseEnPage(page.visuels.map((v) => v.ratio), largeurMax, hauteurMax);
  if (!mise) return;
  page.taille = { largeur: mise.largeur, hauteur: mise.hauteur };
  page.style.width = `${mise.largeur}px`;
  page.style.height = `${mise.hauteur}px`;
  const elements = [...page.children];
  let k = 0;
  let y = MARGE;
  mise.rangees.forEach((rangee, j) => {
    let x = MARGE;
    rangee.forEach((ratio) => {
      const el = elements[k++];
      const l = mise.hauteurs[j] * ratio;
      Object.assign(el.style, { left: `${x}px`, top: `${y}px`, width: `${l}px`, height: `${mise.hauteurs[j]}px` });
      x += l + MARGE;
    });
    y += mise.hauteurs[j] + MARGE;
  });
}

function creerPage(visuels, titre) {
  const page = document.createElement('div');
  page.className = 'fiche__page';
  page.visuels = visuels;
  visuels.forEach((visuel) => {
    const cadre = document.createElement('div');
    cadre.className = 'fiche__visuel';
    if (visuel.type === 'video') {
      const video = creerVideo(true);
      video.poster = apercuDe(visuel.src);
      video.src = visuel.src;
      cadre.append(video);
      observateurVideos.observe(video);
    } else {
      const img = document.createElement('img');
      img.src = visuel.src;
      img.alt = titre;
      cadre.append(img);
    }
    page.append(cadre);
  });
  return page;
}

// Place disponible pour la zone d'images dans la fenêtre
function espaceGalerie() {
  const media = document.querySelector('.fiche__media');
  const nav = document.getElementById('fiche-nav');
  const boite = media.getBoundingClientRect();
  const largeur = Math.floor(boite.width); // arrondi vers le bas : jamais un demi-pixel de trop
  if (matchMedia('(max-width: 1100px)').matches) return { largeur, hauteur: Math.floor(window.innerHeight * 0.7) };
  const hauteurNav = nav.hidden ? 0 : nav.offsetHeight + 16;
  return { largeur, hauteur: Math.floor(boite.height) - hauteurNav };
}

// Calcule la mise en page de toutes les pages, puis met la zone à la taille de la page affichée
function disposerFiche(relance = false) {
  const { largeur, hauteur } = espaceGalerie();
  ficheDiapos.querySelectorAll('.fiche__page').forEach((page) => disposerPage(page, largeur, hauteur));
  const page = ficheDiapos.children[indexFiche]?.querySelector('.fiche__page');
  const taille = page?.taille || { largeur: Math.min(largeur, hauteur * 1200 / 782), hauteur: Math.min(hauteur, largeur * 782 / 1200) };
  ficheGalerie.style.width = `${taille.largeur}px`;
  ficheGalerie.style.height = `${taille.hauteur}px`;
  // Si la fenêtre a changé de largeur entre-temps (barre de défilement apparue), on recalcule une fois
  if (!relance && espaceGalerie().largeur !== largeur) disposerFiche(true);
}
window.addEventListener('resize', () => { if (fiche.open) disposerFiche(); });

let ouverture = 0; // évite de mélanger deux fiches ouvertes coup sur coup

async function ouvrirFiche(id) {
  const projet = FICHES[id];
  const jeton = ++ouverture;
  document.getElementById('fiche-nom').textContent = projet.titre;
  // Plusieurs formats en couches : seul le fichier qui existe s'affiche
  document.getElementById('fiche-fond').style.backgroundImage =
    variantes(projet.fond).map((c) => `url("${c}")`).join(', ');

  const description = document.getElementById('fiche-description');
  description.replaceChildren(...projet.description.map((texte) => {
    const p = document.createElement('p');
    p.textContent = texte;
    return p;
  }));

  // La fenêtre s'ouvre tout de suite ; les visuels arrivent dès qu'ils sont trouvés
  ficheDiapos.replaceChildren();
  ficheDiapos.style.transform = '';
  totalFiche = 0;
  indexFiche = 0;
  document.getElementById('fiche-nav').hidden = true;
  fiche.showModal();
  document.body.classList.add('fiche-ouverte');
  document.querySelectorAll('video').forEach(actualiserVideo); // met en pause la page derrière
  disposerFiche();

  const pages = await pagesDuProjet(id);
  if (jeton !== ouverture || !fiche.open) return;

  ficheDiapos.replaceChildren(...(pages.length ? pages : [null]).map((visuels) => {
    const diapo = document.createElement('div');
    diapo.className = 'fiche__diapo';
    if (visuels) {
      diapo.append(creerPage(visuels, projet.titre));
    } else {
      // Aucun visuel déposé : emplacement gris avec le chemin attendu
      const vide = document.createElement('div');
      vide.className = 'emplacement vide';
      vide.dataset.fichier = `images/projets/${id}/1/1 (.jpg, .png ou .mp4)`;
      diapo.append(vide);
    }
    return diapo;
  }));

  totalFiche = ficheDiapos.children.length;
  document.getElementById('fiche-nav').hidden = totalFiche < 2;
  allerFiche(0);
}

const fichePrecedent = document.getElementById('fiche-precedent');
const ficheSuivant = document.getElementById('fiche-suivant');

// Pas de boucle : on s'arrête à la première et à la dernière image.
// Chaque flèche n'apparaît que s'il reste des images de son côté.
function allerFiche(index) {
  if (!totalFiche) return; // visuels pas encore chargés
  indexFiche = Math.min(Math.max(index, 0), totalFiche - 1);
  ficheDiapos.style.transform = `translateX(-${indexFiche * 100}%)`;
  fichePrecedent.classList.toggle('fleche--masquee', indexFiche === 0);
  ficheSuivant.classList.toggle('fleche--masquee', indexFiche === totalFiche - 1);
  disposerFiche(); // la zone prend la taille de la nouvelle page
  // Les vidéos démarrent et s'arrêtent seules selon ce qui est visible (voir observateurVideos)
}

// La flèche gauche ne fait que reculer, la droite ne fait qu'avancer
// Si la flèche cliquée disparaît (bout de la galerie), le focus passe sur l'autre
function cliquerFleche(sens, fleche, autre) {
  allerFiche(indexFiche + sens);
  if (fleche.classList.contains('fleche--masquee') && document.activeElement === fleche) autre.focus();
}
ficheSuivant.addEventListener('click', () => cliquerFleche(1, ficheSuivant, fichePrecedent));
fichePrecedent.addEventListener('click', () => cliquerFleche(-1, fichePrecedent, ficheSuivant));
// Flèches du clavier dans la fiche
fiche.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') allerFiche(indexFiche + 1);
  if (e.key === 'ArrowLeft') allerFiche(indexFiche - 1);
});
fiche.querySelector('[data-fermer]').addEventListener('click', () => fiche.close());
// Clic en dehors de la fenêtre = fermeture
fiche.addEventListener('click', (e) => { if (e.target === fiche) fiche.close(); });
fiche.addEventListener('close', () => {
  document.body.classList.remove('fiche-ouverte');
  fiche.querySelectorAll('video').forEach((v) => {
    observateurVideos.unobserve(v);
    v.visible = false;
    v.pauseAuto = true;
    v.pause();
  });
  document.querySelectorAll('video').forEach(actualiserVideo); // relance les vidéos visibles de la page
});
