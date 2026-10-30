---
target: client/src/pages/Home.tsx
total_score: 19
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/home/hamidou/Documents/site-begec-btp_2/client/src/pages/Home.tsx"
target_fingerprint: "sha256:6df247561f14b19a9ef9f06eeb2bcac7d4d717d004c6a95e9a72d97e5cadf220"
target_path: /home/hamidou/Documents/site-begec-btp_2/client/src/pages/Home.tsx
timestamp: 2026-10-30T17-11-39Z
slug: client-src-pages-home-tsx
---
# Critique de Design : Page d'Accueil (`client/src/pages/Home.tsx`)

⚠️ DEGRADED: single-context (pas d'outil de sous-agent générique exposé dans ce harnais)

## Design Health Score

| # | Heuristique | Score | Problème Clé identifié |
|---|-------------|-------|------------------------|
| 1 | Visibilité de l'état du système | 3/4 | Filtres interactifs réactifs, mais absence d'indicateur de chargement sur certaines transitions |
| 2 | Correspondance système / monde réel | 3/4 | Vocabulaire BTP authentique, mais divergence des métriques de flotte (200+ vs 100+ documenté) |
| 3 | Contrôle et liberté de l'utilisateur | 3/4 | Fermeture aisée de la modale partenaire, retour "Tous" sur les filtres de chantiers |
| 4 | Cohérence et standards visuels | 2/4 | **Saturation d'orange :** titres H1 et H3 systématiquement en `text-secondary` au lieu du bleu nuit/blanc ; arrondis disparates (`1rem`, `rounded-2xl`, `rounded-3xl`) hors tokens |
| 5 | Prévention des erreurs | 3/4 | Sélections guidées dans le planificateur express limitant les choix invalides |
| 6 | Reconnaissance plutôt que rappel | 3/4 | Fiches chantiers bien catégorisées avec étiquettes explicites |
| 7 | Flexibilité et efficacité | n/a | Non applicable sur une landing page institutionnelle (mode Persuade) |
| 8 | Esthétique et design épuré | 2/4 | Pollution visuelle : l'omniprésence de l'orange neutralise les CTA critiques ; widget Orbit 3D très dense |
| 9 | Gestion et récupération d'erreurs | 3/4 | Données de repli fiables pour les partenaires et projets |
| 10 | Aide et documentation | n/a | Non applicable sur cette surface vitrine |
| **Total** | | **19/32** | **Acceptable (59%)** |

---

## Verdict de Spécificité du Design

**Évaluation du modèle :**
La structure globale est riche et le contenu métier est solidement ancré dans le BTP guinéen (expertises, station de Kouriya, terrassement, engins). En revanche, la mise en œuvre visuelle commet une faute majeure de hiérarchie : **l'Orange Chantier (`#F27100`) est utilisé sur quasiment tous les grands titres de section (H1 du Hero, H3 des expertises, H3 des réalisations, H3 des partenaires)**. Au lieu de guider le regard vers les boutons d'action (comme la demande de devis), la page crie en orange partout. De plus, la géométrie dérive avec des arrondis non conformes à DESIGN.md (`borderRadius="1rem"` sur les MovingBorderButtons et `rounded-3xl` sur la modale).

**Scan déterministe (`impeccable detect`) :**
Le détecteur a relevé 5 infractions aux règles de design sur `client/src/pages/Home.tsx` :
- `line 288`, `line 301`, `line 869`, `line 882` : `borderRadius="1rem"` (16px) en dehors de l'échelle normative de DESIGN.md (`rounded-md` 6px pour les boutons).
- `line 345` : `text-[11px]` hors rampe typographique (`text-xs` / 12px prescrit).

**Superpositions visuelles :**
Pas d'injection overlay active dans le navigateur en mode scan direct.

---

## Impression Générale

Une page d'accueil ambitieuse et dynamique, avec un contenu BTP percutant (chiffres clés, Sticky Content pour les expertises, Orbit 3D pour les partenaires), mais gâchée par une **sur-utilisation de l'orange chantier** qui enfreint la règle des 10% et dégrade la crédibilité institutionnelle. En remettant les titres en Bleu Nuit Ardoise ou Blanc et en normalisant les angles industriels, la page gagnera immédiatement en autorité statutaire.

---

## Ce qui Fonctionne Bien

1. **Le composant immersif des expertises (`StickyContentWrapper`) :** La transition sticky synchronisée illustrant les 4 métiers clés (Bâtiment, Ponts & Chaussées, Terrassement, Assainissement) apporte une réelle valeur pédagogique et statutaire.
2. **Le bandeau de réassurance opérationnelle dans le Hero :** La fiche sombre de disponibilité flotte & équipes à droite du Hero ancre immédiatement l'entreprise comme un constructeur disposant d'engins lourds réels.
3. **Le planificateur rapide de chantier :** Permet à un donneur d'ordres de pré-qualifier son besoin (surface + type d'intervention) avant d'atterrir sur le formulaire de devis.

---

## Problèmes Prioritaires

### [P1] Violation de la règle des 10% d'orange chantier sur les grands titres
- **Pourquoi c'est grave :** Le titre H1 du Hero et les titres majeurs H3 des sections (lignes 272, 424, 459, 562, 654) sont tous stylisés avec `text-secondary` (orange vif). Cela contrevient frontalement à [DESIGN.md](file:///home/hamidou/Documents/site-begec-btp_2/DESIGN.md) ("The 10% Safety Orange Rule"). L'orange sature l'écran, affaiblit le contraste et fait perdre tout impact aux boutons d'action stratégiques.
- **Correction :** Passer les titres de sections claires en Bleu Nuit Ardoise (`text-foreground` / `#0F172A`) et le titre du Hero en Blanc Pur (`text-white`) avec seulement un mot-clé ou le badge en orange.
- **Commande suggérée :** `/impeccable quieter client/src/pages/Home.tsx` ou `/impeccable polish client/src/pages/Home.tsx`

### [P1] Incohérence des rayons de courbure et formes molles
- **Pourquoi c'est grave :** Le système de design impose des angles solides de génie civil (`rounded-md` 6px pour les boutons, `rounded-xl` 12px pour les cartes). Or, les `MovingBorderButton` utilisent `borderRadius="1rem"` (16px), la modale partenaire monte à `sm:rounded-3xl` (24px) et les cartes de réalisations sont en `rounded-2xl`. Cela donne un aspect jouet/arrondi mou en contradiction avec la rigueur BTP.
- **Correction :** Remplacer systématiquement par `rounded-md` (6px) sur les boutons et `rounded-xl` (12px) sur les cartes et modales.
- **Commande suggérée :** `/impeccable polish client/src/pages/Home.tsx`

### [P2] Incohérence des chiffres de flotte d'engins
- **Pourquoi c'est grave :** La fiche du Hero et le compteur affichent "200+ Engins Lourds", tandis que la vérité produit consignée dans [PRODUCT.md](file:///home/hamidou/Documents/site-begec-btp_2/PRODUCT.md) et la page À Propos mentionne "+100 engins actifs". Un donneur d'ordres institutionnel ou minier détectera une divergence entre les pages.
- **Correction :** Harmoniser sur `100+` ou `150+` selon l'inventaire matériel validé.
- **Commande suggérée :** `/impeccable clarify client/src/pages/Home.tsx`

### [P2] Encombrement et manipulation tactile de l'Orbit 3D sur mobile
- **Pourquoi c'est grave :** Le composant `OrbitImages` possède un rayon fixe (`radiusX={530}`) qui force un cadrage réduit sur petit écran, rendant le clic sur les logos ou le texte central délicat avec le pouce.
- **Correction :** Adapter la taille et les rayons sur mobile (`md:radiusX`), ou proposer une grille/carrousel responsive sous 640px.
- **Commande suggérée :** `/impeccable adapt client/src/pages/Home.tsx`

---

## Alertes par Persona

- **Casey (Donneur d'ordres sur mobile en déplacement sur chantier) :** Le titre du Hero en orange vif sur fond photo est plus difficile à lire sous forte luminosité solaire qu'un texte blanc pur contrasté. L'animation Orbit 3D au bas de page est difficile à piloter d'une seule main.
- **Jordan (Nouveau visiteur institutionnel / bailleur de fonds) :** Reçoit une impression criarde à cause de la surabondance d'orange sur tous les titres, ce qui évoque un site promotionnel grand public plutôt qu'une entreprise générale de travaux publics statutaire.
- **Alex (Directeur technique pressé) :** Recherche immédiatement la preuve technique et les références de ponts et terrassement : les boutons de filtre de chantiers sont clairs, mais le bouton devis n'émerge pas assez des titres environnants.

---

## Observations Mineures

- Ligne 345 : La classe `text-[11px]` sur le badge "BTP QUALIFIÉ" doit être remplacée par `text-xs` (12px).
- Ligne 853 : Le badge "Réponse garantie sous 24h ouvrées" dans le CTA final contredit le footer et le hero qui annoncent "Devis garanti sous 48h". Il faut harmoniser l'engagement de délai à 48h.
- Le contraste du lien "Voir l'ensemble du portfolio" (ligne 544) en `variant="outline"` mériterait une bordure plus affirmée (`border-primary` ou `border-foreground/20`).

---

## Questions Stratégiques

1. Souhaitez-vous calmer immédiatement la palette de la page d'accueil pour restituer au Bleu Nuit Ardoise (`#0F172A`) et au Blanc Pur (`#FFFFFF`) la dominance des titres, en confinant l'orange uniquement aux boutons d'action et badges clés ?
2. Faut-il harmoniser l'engagement de devis sur toute la page à "48h" et le parc matériel à "100+ engins lourds" pour être en parfaite conformité avec [PRODUCT.md](file:///home/hamidou/Documents/site-begec-btp_2/PRODUCT.md) ?
