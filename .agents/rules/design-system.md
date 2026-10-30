# Conformité Stricte au Système de Design (DESIGN.md)

Ce projet dispose d'une autorité de design normative formalisée dans [DESIGN.md](file:///home/hamidou/Documents/site-begec-btp_2/DESIGN.md).

## Directive Absolue et Inviolable

Pour toute intervention, création, modification, ajout de composant, page ou style frontend (HTML, TSX, CSS, Tailwind) :
**Tu dois impérativement et strictement te conformer aux tokens, principes et règles définis dans `DESIGN.md`. Aucune déviation n'est autorisée.**

---

## 1. Palette Colorimétrique et Contrastes (Non-Négociables)

- **Fonds dominants :** Utiliser exclusivement le Blanc Pur (`#FFFFFF`), le Gris Technique Givré (`#F1F5F9` / `bg-muted/40`) ou le Bleu Nuit Ardoise profond (`#0F172A` / `bg-slate-950`) pour les fiches d'actifs industriels.
- **Bleu Technique BTP (`#1F3C88`) :** Réservé à l'autorité institutionnelle, boutons primaires (`bg-primary`), badges de statut technique et logos.
- **Règle des 10% d'Orange Chantier (`#F27100`) :** L'orange sécurité est un accent à haute visibilité. **Il ne doit jamais occuper plus de 10% de la surface visible** et ne doit JAMAIS servir de fond de section entière. Il est strictement réservé aux actions stratégiques (bouton Devis sous 48h, badges prioritaires, chiffres clés).
- **Contraste WCAG AA Strict :** Aucun texte gris clair ou délavé sur fond clair. Ratio de contraste minimal de 4.5:1 exigé en toute circonstance.

---

## 2. Typographie et Hiérarchie

- **Titres (`font-heading`) :** Police `Poppins`, sans-serif (`font-bold` ou `font-extrabold`, `tracking-tight`).
- **Corps de texte (`font-sans`) :** Police `Inter`, sans-serif (`font-normal` ou `font-medium`, `text-foreground` ou `text-muted-foreground`).
- **Micro-labels en majuscules :** Toute catégorie, tag ou sur-titre contextuel doit obligatoirement être en MAJUSCULES avec un espacement étendu (`uppercase tracking-wider` ou `tracking-widest`, taille `text-xs`).
- **Doctrine des Grands Chiffres :** Tout compteur métrique (années, engins, capacités) s'affiche obligatoirement en grand format (`text-3xl` à `text-5xl`) en couleur accent ou primaire.

---

## 3. Géométrie et Formes Industrielles (Angles Solides)

- **Interdiction formelle des formes molles :** Proscription stricte des arrondis excessifs (`rounded-3xl`, formes organiques, bulles).
- **Échelle des arrondis autorisés :**
  - Contrôles, boutons, champs : `rounded-md` (6px)
  - Cartes et conteneurs : `rounded-xl` (12px)
  - Étiquettes techniques : `rounded-md` (4px - 6px)
- **Délimitations nettes :** Toujours préserver une bordure fine de 1px (`border border-border` ou `border-white/10` sur fond sombre) pour conserver la précision de l'ingénierie civile.

---

## 4. Élévation et Mouvements

- **Plat au repos (*Flat-Resting*) :** Les surfaces sont planes au repos avec ombrage minimal (`shadow-sm`). La surélévation (`translateY(-2px)` et `shadow-md`) ne doit intervenir qu'en réponse à un survol ou sur une modale.
- **Animations sobres et techniques :** Mouvements fluides, mesurés et calmes (`framer-motion`). Bannir toute animation clignotante ou parasite.

---

## 5. Intégrité des Preuves et Données

- Ne jamais inventer de fausses allégations, de faux avis clients ou de labels fantaisistes.
- Valoriser systématiquement les actifs réels de BEGEC TP : station de concassage et 2 centrales d'enrobage à Kouriya, 100+ engins lourds, couverture de 8+ préfectures en Guinée, topographie certifiée et devis sous 48h.
