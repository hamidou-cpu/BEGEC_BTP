---
name: BEGEC TP
description: Système de design industriel et institutionnel de BEGEC-TRAVAUX-GIE
colors:
  primary: "#1f3c88"
  primary-deep: "#172d66"
  secondary: "#f27100"
  secondary-hover: "#d96500"
  neutral-dark: "#0f172a"
  neutral-bg: "#ffffff"
  neutral-muted: "#f1f5f9"
  neutral-border: "#e2e8f0"
  text-muted: "#64748b"
  destructive: "#ef4444"
typography:
  display:
    fontFamily: "Poppins, sans-serif"
    fontSize: "3.5rem"
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Poppins, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Poppins, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.35
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.05em"
rounded:
  sm: "3px"
  md: "6px"
  lg: "9px"
  xl: "12px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.primary-deep}"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-secondary-hover:
    backgroundColor: "{colors.secondary-hover}"
---

# Design System: BEGEC TP

## Overview

**Creative North Star: "Le Mastodonte d'Ingénierie Guinéenne"**

Le système de design de **BEGEC-TRAVAUX-GIE** incarne la puissance industrielle, la rigueur technique et la solidité opérationnelle d'un acteur majeur des travaux publics et du génie civil en République de Guinée. L'interface traduit la réalité du terrain : la précision millimétrique de la topographie, la masse des engins lourds, l'autonomie des centrales d'enrobage et de concassage à Kouriya, et l'exigence statutaire requise pour négocier avec les ministères et multinationales minières.

L'esthétique rejette tout artifice purement décoratif ou "gadget". Elle privilégie des compositions architecturales claires, des contrastes francs entre le blanc immaculé de la documentation technique, le bleu nuit ardoise des panneaux de synthèse et l'orange signalétique de chantier. Chaque composant est conçu pour transmettre la fiabilité, la robustesse et la réactivité d'une entreprise capable de mobiliser des centaines d'engins et de livrer des chantiers stratégiques dans les règles de l'art.

**Key Characteristics:**
- **Clarté architecturale :** Grilles géométriques structurées, typographie hiérarchisée et lecture immédiate des métriques clés.
- **Rigueur industrielle :** Contrastes marqués, finitions nettes de 1px, panels sombres statutaires pour les données matérielles.
- **Signalétique fonctionnelle :** Usage discipliné de l'orange sécurité pour orienter la décision et l'action sans saturer l'œil.
- **Densité équilibrée :** Rythme vertical aéré permettant d'absorber la complexité technique sans alourdir l'expérience.

## Colors

La palette repose sur une dualité forte : un socle institutionnel bleu technique / ardoise soutenu par un orange de sécurité industrielle vif et percutant.

### Primary
- **Bleu Technique BTP** (`#1f3c88`): Couleur identitaire majeure de BEGEC TP. Utilisée pour les boutons d'action primaires, les badges institutionnels, les surlignages de marque et les en-têtes d'autorité.
- **Bleu Profond Accent** (`#172d66`): Variante d'interaction au survol et états actifs sur les composants primaires.

### Secondary
- **Orange Chantier & Sécurité** (`#f27100`): Couleur d'accentuation haute visibilité. Employée avec parcimonie pour les appels à l'action critiques (demandes de devis), les indicateurs d'état prioritaires et les liserés dynamiques de mise en valeur.
- **Orange Cuivré Sauté** (`#d96500`): État survol pour les boutons secondaires et indicateurs d'interaction.

### Neutral
- **Bleu Nuit Ardoise** (`#0f172a`): Noir technique d'une grande profondeur pour le texte principal, les panneaux de capacités matérielles sombres et les bordures de haute intensité.
- **Blanc Pur** (`#ffffff`): Fond principal des pages, apportant fraîcheur, lisibilité et rendu chirurgical aux fiches techniques.
- **Gris Technique Givré** (`#f1f5f9`): Fond des cartes secondaires, des sections alternées et des conteneurs d'arrière-plan.
- **Ligne de Structure** (`#e2e8f0`): Teinte de bordure standardisée (1px) délimitant rigoureusement les cartes, tables et séparateurs.
- **Ardoise Neutre** (`#64748b`): Texte secondaire, libellés de support et métadonnées contextuelles.

### Named Rules
**The 10% Safety Orange Rule.** L'orange de chantier (`#f27100`) ne doit jamais occuper plus de 10% de la surface d'un écran. Sa force réside dans sa rareté : s'il recouvre un arrière-plan entier, il perd sa fonction de signal d'alerte et d'appel à l'action.
**The High-Contrast Legibility Rule.** Tout texte sur fond blanc, gris clair ou ardoise foncé doit satisfaire strictement au ratio de contraste WCAG AA (minimum 4.5:1). Aucun texte gris pâle sur fond clair n'est toléré.

## Typography

**Display Font:** Poppins (sans-serif)
**Body Font:** Inter (sans-serif)
**Label/Technical Font:** Inter (sans-serif), avec variantes tabulaires ou monospace pour coordonnées et métriques

**Character:** L'alliance d'un titre en Poppins (géométrique, affirmé, statutaire) et d'un corps en Inter (neutre, lisible à toute échelle) confère à l'interface le sérieux d'un rapport d'ingénierie moderne et l'énergie d'une entreprise en pleine expansion.

### Hierarchy
- **Display** (800, `3.5rem` / `clamp(2.5rem, 5vw, 4rem)`, `line-height: 1.12`): Titres de bannières principales et grands chiffres d'impact.
- **Headline** (700, `2.25rem` / `clamp(1.75rem, 3vw, 2.5rem)`, `line-height: 1.2`): Titres de sections (Expertises, À propos, Réalisations).
- **Title** (600, `1.25rem` à `1.5rem`, `line-height: 1.35`): Noms de cartes projets, intitulés d'expertises et en-têtes de colonnes.
- **Body** (400 / 500, `1rem`, `line-height: 1.6`): Paragraphes explicatifs, descriptifs techniques et argumentaires chantiers. Longueur maximale recommandée : 65 à 75 caractères.
- **Label** (600 / 700, `0.75rem`, `letter-spacing: 0.05em` à `0.1em`, majuscules obligatoires): Badges de préfectures, catégories de travaux, méta-données et étiquettes techniques.

### Named Rules
**The Uppercase Micro-Label Rule.** Toute catégorie, étiquette de statut ou sur-titre contextuel est systématiquement rédigé en majuscules avec un espacement de lettres élargi (`tracking-wider` ou `tracking-widest`).
**The Big Numbers Doctrine.** Les statistiques d'actifs (années d'expérience, engins, préfectures) sont toujours présentées avec des chiffres surdimensionnés (`3xl` à `5xl`) en couleur secondaire ou primaire, accompagnés d'un libellé court et explicite.

## Layout

L'organisation spatiale s'appuie sur une grille modulaire flexible :
- **Conteneur standard :** `container mx-auto px-4 sm:px-6 lg:px-8` avec une largeur maximale bornée à 1280px (`max-w-7xl`).
- **Rythme vertical :** Espacement entre sections majeures de `py-16` (64px) sur mobile à `py-24` (96px) sur grand écran.
- **Grille de cartes :** Grille adaptative 1 colonne sur mobile, 2 colonnes sur tablette (`md:grid-cols-2`), 3 ou 4 colonnes sur desktop (`lg:grid-cols-3` ou `lg:grid-cols-4`) avec un gap uniforme de 24px (`gap-6`).

### Named Rules
**The Technical Breathing Rule.** Ne jamais condenser des données techniques complexes sans séparateur clair ou espacement d'au moins 24px. Une mise en page aérée renforce le sentiment de rigueur et de maîtrise.

## Elevation & Depth

Le système emploie une philosophie **"Tonal Layering & Crisp Borders"** :
- Les surfaces reposent à plat au repos avec des bordures précises de 1px (`#e2e8f0` sur fond clair, `rgba(255,255,255,0.1)` sur fond sombre).
- Les ombres sont discrètes, feutrées et réservées aux élévations d'interaction au survol.
- La profondeur découle de l'alternance de surfaces contrastées (cartes blanches sur fond gris clair, ou panneaux sombres `bg-slate-950` en rupture).

### Shadow Vocabulary
- **Subtle Surface** (`box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)`): Ombre par défaut au repos sur cartes et inputs.
- **Hover Lift** (`box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`): Appliqué lors du survol d'un élément cliquable avec translation verticale `translateY(-2px)`.
- **Overlay & Sheet** (`box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.15)`): Modales, tiroir de navigation mobile et menus contextuels.

### Named Rules
**The Flat-Resting Rule.** Les conteneurs et cartes sont plats au repos. La surélévation ne se manifeste qu'en réponse à une interaction utilisateur ou pour une superposition modale.

## Shapes

Le langage des formes privilégie la géométrie structurée du génie civil :
- **Rayons de courbure (Border Radius) :**
  - Boutons & champs de saisie : `rounded-md` (`6px`)
  - Cartes et conteneurs : `rounded-xl` (`12px`)
  - Badges techniques : `rounded-md` (`4px` à `6px`) ou `rounded-full` pour les compteurs circulaires
- **Découpes & accents :**
  - Finitions en biais (`clip-diagonal`) sur certaines séparations de blocs industriels.
  - Trames en pointillés discrets (`radial-gradient` à 3.5% d'opacité) en fond de header technique.

### Named Rules
**The Solid Angles Rule.** Les arrondis excessifs (`rounded-3xl` ou formes organiques molles) sont formellement proscrits. Les structures du BTP s'expriment par des angles affirmés et des arêtes nettes.

## Components

### Buttons
- **Shape:** Bords adoucis avec précision (`rounded-md`, 6px).
- **Primary:** Fond Bleu Technique (`#1f3c88`), texte blanc, padding horizontal généreux (`px-6 py-2.5`). Survol : passage au Bleu Profond (`#172d66`) avec micro-surélévation.
- **Secondary (Action Chantier) :** Fond Orange Sécurité (`#f27100`), texte blanc ou sombre contrasté. Survol : assombrissement léger (`#d96500`).
- **Outline / Ghost :** Fond transparent, bordure 1px Ligne de Structure (`#e2e8f0`), texte Bleu Nuit.
- **MovingBorderButton (Signature CTA) :** Bouton à liseré lumineux tournant réservé au bouton d'appel d'action le plus stratégique de la page (ex. Demande de devis).

### Cards / Containers
- **Corner Style:** `rounded-xl` (`12px`).
- **Standard Card:** Fond blanc pur (`#ffffff`), bordure subtile 1px (`#e2e8f0`), ombre légère au repos, transition fluide au survol.
- **Industrial Slate Card:** Fond `bg-slate-950` avec bordure `border-slate-800`, accentuation supérieure par un dégradé orange-bleu de 2px, typographie blanche et étiquettes techniques contrastées.

### Badges / Chips
- **Style:** Compacts, lisibles, sans retour à la ligne.
- **Variante Technique :** Fond `bg-primary/10`, texte `text-primary`, bordure `border-primary/20`.
- **Variante Alerte / Chantier :** Fond `bg-secondary/10`, texte `text-secondary`, bordure `border-secondary/20`.

### Inputs / Form Fields
- **Style:** Fond blanc, bordure 1px `#e2e8f0`, texte `#0f172a`, rayon `rounded-md` (6px), padding `10px 14px`.
- **Focus:** Anneau d'accentuation net (`ring-2 ring-primary/20 border-primary`), sans décalage de layout.
- **Labels :** Texte en gris ardoise (`#0f172a`), graisse 500, accompagnés d'indicateurs requis clairs.

### Navigation
- **Navbar :** Fixée en haut d'écran, fond blanc avec flou d'arrière-plan (`backdrop-blur-md`) dès que l'utilisateur défile (`isScrolled`), assurant une lisibilité constante.
- **Topbar Institutionnelle :** Bandeau technique affichant les téléphones d'urgence travaux, les horaires de bureau et la géolocalisation Conakry / Kouriya.

## Do's and Don'ts

### Do:
- **Do** toujours utiliser le bleu nuit `#0F172A` ou le blanc pur `#FFFFFF` comme fonds structurels dominants.
- **Do** réserver l'orange chantier `#F27100` aux éléments d'interaction ou d'alerte prioritaires (CTA secondaire, badges phares, chiffres clés).
- **Do** afficher systématiquement des métriques vérifiées et contextuelles (ex: "Station de concassage", "+100 engins", "devis sous 48h") plutôt que des promesses vagues.
- **Do** concevoir tous les tableaux, fiches chantiers et formulaires de devis pour une utilisation mobile fluide sur chantier.
- **Do** associer chaque titre de section à son étiquette contextuelle en majuscules (ex: `Gros Œuvre & Modernisation`, `CAPACITÉS MATÉRIELLES`).
- **Do** maintenir des bordures de délimitation nettes de 1px sur les cartes et conteneurs pour préserver la rigueur technique.
- **Do** vérifier le contraste WCAG AA sur chaque texte ou badge coloré.

### Don't:
- **Don't** utiliser de dégradés multicolores fantaisistes ou d'effets néon déconnectés de l'univers du génie civil.
- **Don't** arrondir excessivement les cartes ou conteneurs majeurs (pas de `rounded-3xl` ni de formes molles non industrielles).
- **Don't** diluer la lisibilité des textes avec des gris trop clairs sur fond blanc (respecter impérativement le contraste WCAG AA).
- **Don't** ajouter de fausses promesses ou avis clients inventés : seuls les projets réels documentés et les chiffres réels de l'entreprise sont admissibles.
- **Don't** surcharger l'écran d'animations distrayantes : les mouvements doivent être techniques, calmes, au service de la lecture (transitions fluides, défilement maîtrisé, compteurs métriques).
- **Don't** utiliser l'orange de chantier sur de grands aplats d'arrière-plan de section complète.
