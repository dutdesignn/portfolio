/*
  CONTENU DU PORTFOLIO
  --------------------
  Tout le texte et les chemins d'images du site sont ici.
  Pour ajouter une image : dépose le fichier au chemin indiqué (ex. images/vignettes/lfl.jpg).
  Le format n'a pas d'importance : lfl.png, lfl.jpeg, lfl.webp, ou une vidéo lfl.mp4 / .webm / .mov,
  fonctionnent aussi sans rien changer ici.
  Tant qu'un fichier manque, le site affiche un emplacement gris avec son chemin.

  - ACCUEIL   : les images du grand cadre de la page d'accueil (diaporama).
  - FICHES    : le contenu de la fenêtre qui s'ouvre au clic sur une carte.
                Les visuels de la fenêtre n'ont pas besoin d'être listés ici :
                le site les lit dans images/projets/<projet>/1/, 2/, 3/
                (une page par dossier, visuels nommés 1, 2, 3… dans chaque dossier).
                Pour plus de 3 pages, ajoute par ex. « pages: 4, » au projet.
  - CARTES    : les cartes de chaque catégorie, dans l'ordre d'affichage.
                "fiche" = l'identifiant de la fiche à ouvrir (null = pas cliquable).
*/

const ACCUEIL = [
  'images/accueil/1.jpg',
  'images/accueil/2.jpg',
  'images/accueil/3.jpg',
];

const FICHES = {
  vgc: {
    titre: 'VALORANT GAME CHANGERS',
    fond: 'images/vignettes/vgc.jpg',
    description: [
      'Ce projet, je l’ai réalisé pendant mon stage chez Karmine Corp, pour les matchs de l’équipe Valorant Game Changers. L’idée était de construire une scène 3D plongée dans l’univers du jeu, avec ses armes, ses douilles et une lumière rouge omniprésente. Au centre de chaque visuel, il y a une carte MATCHDAY, VICTORY ou DEFEAT, comme une pièce à conviction posée au milieu du décor.',
      'Je me suis surtout concentré sur le compositing. J’ai travaillé à partir d’assets 3D libres de droit ou fournis par l’entreprise, et tout l’enjeu était de les faire vivre ensemble dans une même scène. L’éclairage a pris une place centrale dans le processus. C’est lui qui donne l’ambiance, entre le rouge très saturé, les reflets sur les armes et les zones de flou au premier plan qui donnent de la profondeur. Il fallait que cette atmosphère reste cohérente d’un visuel à l’autre.',
      'Côté graphisme, je voulais des cartes sobres, presque administratives, avec une typographie brute, des éléments techniques et des images tramées. Chaque carte a son propre symbole. Le logo de l’adversaire pour le jour de match, une couronne pour la victoire, et un regard pour la défaite. Le contraste entre ces cartes très épurées et la scène chargée autour, c’est ce qui donne du caractère à l’ensemble.',
    ],
  },

  lfl: {
    titre: 'LFL',
    fond: 'images/vignettes/lfl.jpg',
    description: [
      'Pour Karmine Corp Blue, l’équipe League of Legends du club, j’ai conçu toute la série de visuels qui accompagnait la saison. Jour de match, victoire, défaite, résultat final… chaque moment avait son affiche, et il fallait qu’elles forment un tout reconnaissable.',
      'Pour ça, je suis parti d’une idée de dossier d’enquête. Les joueurs deviennent des « suspects », avec leur numéro de dossier, leur statut, leurs empreintes digitales et des tampons officiels. Les photos sont posées comme des clichés agrafés sur une feuille froissée, et le nom de chaque joueur est écrit à la main, comme sur une vraie fiche. Ce concept m’a permis de raconter la saison comme une affaire qu’on suit match après match.',
      'La couleur joue aussi un rôle dans la narration. Le bleu accompagne les jours de match et les victoires, tandis que la défaite et la fin de parcours basculent dans le rouge et le noir et blanc, avec un grain plus dur. Pour la typographie, j’ai misé sur des titres énormes et texturés, presque abîmés, qui contrastent avec les petites infos techniques façon formulaire. Le résultat garde une identité forte tout en laissant chaque affiche exprimer l’émotion du moment.',
    ],
  },

  'blue-rising': {
    titre: 'BLUE RISING',
    fond: 'images/vignettes/blue-rising.jpg',
    description: [
      'Blue Rising, c’est le jeu de cartes à collectionner lancé par Karmine Corp, et j’ai travaillé sur plusieurs visuels pour accompagner son lancement. L’enjeu était de faire exister le jeu au-delà des cartes elles-mêmes, à travers des offres, des événements et des éditions spéciales.',
      'Pour l’offre limitée de l’EWC, j’ai imaginé une composition en plein ciel. Les boosters s’envolent autour d’un artbook en pierre recouvert de lierre, comme un vieux grimoire tout droit sorti de l’univers du jeu. Je voulais un visuel qui donne envie tout de suite, et qui sorte un peu des codes habituels du club.',
      'Pour le tournoi en ligne et le pack Canna, je suis reparti de l’identité du jeu, avec un bleu nuit profond, des dorures et des feuillages qui viennent encadrer les cartes. Ici, ce sont les illustrations qui portent tout, alors j’ai cherché à les mettre en valeur sans les étouffer. Le pack Canna a ensuite été décliné en plusieurs formats, du post en paysage à la story en passant par l’affiche avec QR code, en gardant à chaque fois une hiérarchie claire entre la carte, l’offre et l’info pratique.',
    ],
  },

  'blue-tour': {
    titre: 'BLUE TOUR',
    fond: 'images/vignettes/blue-tour.jpg',
    description: [
      'Pour l’EWC 2026 à Paris, j’ai réalisé une série de visuels pour faire venir la communauté sur le stand Karmine House. Il fallait annoncer plusieurs temps forts, du meet and greet avec le roster Rocket League au Blue Tour, tout en gardant une campagne cohérente.',
      'Le Blue Tour était le projet le plus original. Des camions équipés d’écrans ont traversé Paris en suivant le parcours de la carte, en diffusant les visuels avec QR code. La campagne existait donc à la fois en ligne et directement dans la ville.',
      'J’ai construit un gabarit commun pour décliner rapidement chaque annonce sur tous les formats, des réseaux aux écrans des camions. L’idée était qu’en un coup d’œil, on reconnaisse Karmine, qu’on comprenne où et quand venir, et qu’on ait envie de se déplacer.',
    ],
  },

  'le-petit-bain': {
    titre: 'LE PETIT BAIN',
    fond: 'images/vignettes/le-petit-bain.jpg',
    description: [
      'Petit Bain, c’est un projet né pendant mes études. Le point de départ était simple. Il s’agissait de créer un dépliant pour le lieu, avec sa programmation au verso.',
      'Assez vite, j’ai eu envie de jouer avec le pliage lui-même. Ouvert, le dépliant fait un A3. Une fois replié, il tient dans un A5. Et selon le sens dans lequel on le plie, il révèle deux designs complètement différents. Le même objet peut donc avoir deux visages, et c’est à celui qui le tient de choisir.',
      'Pour la programmation, je voulais garder ce côté graphique affirmé sans perdre l’essentiel, c’est-à-dire qu’on trouve l’info en un coup d’œil. L’idée, c’était que les usagers puissent repérer la date ou l’artiste qui les intéresse rapidement, sans avoir à déchiffrer quoi que ce soit.',
    ],
  },

  'retro-gaming': {
    titre: 'RÉTRO GAMING FESTIVAL',
    fond: 'images/vignettes/retro-gaming.jpg',
    description: [
      'Retro Gaming Festival est un projet d’affiche construit autour d’un logo typographique fort.',
      'Je voulais jouer sur le contraste entre deux mondes. D’un côté la calligraphie, avec ses courbes et ses arabesques, et de l’autre le numérique, avec ses pixels. Le résultat donne une écriture manuscrite entièrement pixelisée, posée autour d’un « GAMING » massif et carré.',
      'Le reste de l’affiche prolonge cette idée. La programmation reprend les codes d’une interface d’ordinateur, avec une barre de recherche, des boutons et un curseur, tandis que le fond rouge et le grain apportent un côté rétro plus chaleureux.',
      'J’ai ensuite décliné le visuel en motion pour les réseaux sociaux, pour donner vie au logo et faire exister le festival au-delà du simple print.',
    ],
  },

  'karmine-corp': {
    titre: 'KARMINE CORP',
    fond: 'images/vignettes/karmine-corp.jpg',
    description: [
      'Pendant mon stage chez Karmine Corp, j’ai réalisé un ensemble de motions pour les contenus vidéo du club. Une partie concernait l’habillage, avec des éléments animés qui viennent rythmer les vidéos et renforcer l’identité de Karmine à l’écran.',
      'J’ai aussi conçu des motions de questions, déclinés selon les événements. L’enjeu était de garder une base reconnaissable tout en adaptant l’univers visuel à chaque occasion, pour que chaque format colle à son contexte sans perdre la signature du club.',
    ],
  },

  arte: {
    titre: 'ARTE',
    fond: 'images/vignettes/arte.jpg',
    description: [
      'Pour ce projet fictif, j’ai imaginé une courte animation pour Arte, pensée pour un post Instagram en format vertical. Je voulais traduire en quelques secondes ce qui fait l’identité de la chaîne, c’est-à-dire sa curiosité et la diversité de ce qu’elle propose.',
      'Au centre, le logo se transforme en passant d’un style typographique à l’autre, du gras au trait fin, jusqu’à une version collage façon timbre et papier déchiré. Tout autour, un anneau d’illustrations et de couvertures tourne en 3D, comme une programmation qui défile. L’animation revient ensuite au logo officiel, pour rappeler qu’Arte reste reconnaissable derrière toutes ces facettes.',
    ],
  },

  carnaval: {
    titre: 'CARNAVAL CAEN',
    fond: 'images/vignettes/carnaval.jpg',
    description: [
      'Pour le Carnaval de Caen, le projet consistait à créer des boucles d’animation autour du thème des années 2000. Chacun apportait sa propre vision de l’époque, ce qui a donné un ensemble d’animations très variées.',
      'De mon côté, j’ai choisi une approche numérique, inspirée de l’univers du jeu vidéo. Je voulais retrouver l’esthétique des écrans et des interfaces de cette période, avec ce côté un peu brut et pixelisé qui en fait tout le charme. Comme il s’agissait de boucles, il fallait aussi que chaque animation se répète naturellement, sans coupure visible.',
    ],
  },

  'nuits-sonores': {
    titre: 'NUITS SONORES',
    fond: 'images/vignettes/nuits-sonores.jpg',
    description: [
      'Pour ce projet, j’ai imaginé une campagne d’affichage numérique (DOOH) pour Nuits Sonores, le festival de musique électronique lyonnais. Le projet mélange la 3D, le graphisme et le motion, avec une idée simple, le switch. L’affiche montre d’abord un hangar vide et silencieux. Puis l’image bascule, et le même lieu se retrouve envahi par la végétation, la lumière et l’énergie de la fête.',
      'J’ai construit la scène dans Blender avant de passer sur After Effects pour le compositing et l’animation. Le logo suit la même transformation que le décor, en passant d’un rose et cyan néon à une version plus brute en noir et blanc.',
      'Pour montrer le rendu en conditions réelles, j’ai intégré l’animation sur un abribus en pleine rue. L’idée était de surprendre le passant, qui lève les yeux de son téléphone et découvre une affiche qui a changé de visage.',
    ],
  },

  lec: {
    titre: 'LEC SUMMER ROADTRIP 2026',
    fond: 'images/vignettes/lec.jpg',
    description: [
      'Pour le LEC Summer Roadtrip 2026, organisé par Karmine Corp à l’Adidas Arena, j’ai animé le visuel principal de l’événement, réalisé par Dhav Oza. Il fallait donner vie à cette ambiance bleue et brumeuse, presque épique, tout en respectant le travail d’origine.',
      'Une fois l’animation posée, tout l’enjeu était de la décliner pour chaque support de l’événement. Les écrans de la salle, les écrans sur scène devant les bureaux des joueurs, les bandeaux LED qui font le tour de l’arène et le live Twitch de Kameto avaient chacun leurs formats et leurs contraintes. J’ai donc adapté le visuel en plusieurs versions, du preshow aux écrans de remerciement en fin d’événement, pour que l’identité reste la même partout, que l’on soit dans la salle ou devant son écran.',
    ],
  },

};

const CARTES = {
  'design-graphique': [
    { fiche: 'vgc', titre: 'VALORANT GAME CHANGERS', annee: '2026', vignette: 'images/vignettes/vgc.jpg',
      resume: 'Création de la direction artistique pour la communication de l’équipe Valorant game changer KARMINE CORP' },
    { fiche: 'lfl', titre: 'LFL', annee: '2026', vignette: 'images/vignettes/lfl.jpg',
      resume: 'Réalisation de la direction artistiques pour la communication de l’équipe LFL KARMINE CORP' },
    { fiche: 'blue-rising', titre: 'BLUE RISING', annee: '2026', vignette: 'images/vignettes/blue-rising.jpg',
      resume: 'Création de visuels pour la communication du TCG de KARMINE CORP' },
    { fiche: 'blue-tour', titre: 'BLUE TOUR', annee: '2026', vignette: 'images/vignettes/blue-tour.jpg',
      resume: 'Réalisation de communication dans la cadre de l’EWC pour des évènement organisé par l’équipe KARMINE CORP' },
    { fiche: 'le-petit-bain', titre: 'LE PETIT BAIN', annee: '2026', vignette: 'images/vignettes/le-petit-bain.jpg',
      resume: 'Réalisation d’un dépliant associant visuel accrocheur et programmation réalisé dans le cadre de mes études pour LE PETIT BAIN' },
    { fiche: 'retro-gaming', titre: 'RETRO GAMING FESTIVAL', annee: '2026', vignette: 'images/vignettes/retro-gaming.jpg',
      resume: 'Réalisation fictive de la communication d’un festival de rétro gaming et déclinaison animé pour les réseaux sociaux' },
  ],

  'motion-design': [
    { fiche: 'karmine-corp', titre: 'KARMINE CORP', annee: '2026', vignette: 'images/vignettes/karmine-corp.jpg',
      resume: 'Réalisations de divers motion design pour couvrir les besoins de communication de l’équipe KARMINE CORP' },
    { fiche: 'arte', titre: 'ARTE', annee: '2026', vignette: 'images/vignettes/arte.jpg',
      resume: 'Projet fictive de motion design pour ARTE' },
    { fiche: 'carnaval', titre: 'CARNAVAL CAEN', annee: '2026', vignette: 'images/vignettes/carnaval.jpg',
      resume: 'Dans le cadre de mes études j’ai pu participé à la création d’une boucle de 45 minutes diffusé sur le premier char a écran du carnaval étudiant de Caen' },
    { fiche: 'nuits-sonores', titre: 'NUITS SONORES', annee: '2026', vignette: 'images/vignettes/nuits-sonores.jpg',
      resume: 'Réalisation d’un Digital Out Of Home mixant prise de vue réel, modélisation 3D, motion design et graphisme dans le cadre de mes études' },
    { fiche: 'lec', titre: 'LEC SUMMER ROADTRIP', annee: '2026', vignette: 'images/vignettes/lec.jpg',
      resume: 'Animation et déclinaison d’un Master visuel pour le live de KAMETO et la diffusion durant le LEC SUMMER ROADTRIP 2026 a L’ADIDAS ARENA' },
    { fiche: 'retro-gaming', titre: 'RETRO GAMING FESTIVAL', annee: '2026', vignette: 'images/vignettes/retro-gaming-motion.jpg',
      resume: 'Réalisation fictive de la communication d’un festival de rétro gaming et déclinaison animé pour les réseaux sociaux' },
  ],

  'creation-3d': [
    { fiche: 'vgc', titre: 'VALORANT GAME CHANGERS', annee: '2026', vignette: 'images/vignettes/vgc-3d.jpg',
      resume: 'Création de la direction artistique pour la communication de l’équipe Valorant game changer KARMINE CORP' },
    { fiche: 'nuits-sonores', titre: 'NUITS SONORES', annee: '2026', vignette: 'images/vignettes/nuits-sonores-3d.jpg',
      resume: 'Réalisation d’un Digital Out Of Home mixant prise de vue réel, modélisation 3D, motion design et graphisme dans le cadre de mes études' },
    { fiche: 'carnaval', titre: 'CARNAVAL CAEN', annee: '2026', vignette: 'images/vignettes/carnaval-3d.jpg',
      resume: 'Modélisation et animation d’un Nokia 3310 afin de l’intégrer dans une boucle du Carnaval étudiant de Caen' },
  ],
};
