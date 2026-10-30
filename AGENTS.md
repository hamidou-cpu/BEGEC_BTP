# Consignes et Règles du Projet BEGEC TP

Ce fichier définit les directives obligatoires pour tout agent intervenant sur le dépôt.

---

## 1. Conformité Absolue au Système de Design

Pour toute modification, création ou intervention UI/Frontend (HTML, TSX, CSS, Tailwind) :
**Se conformer strictement et sans exception aux spécifications de [DESIGN.md](file:///home/hamidou/Documents/site-begec-btp_2/DESIGN.md).**

### Règles Colorimétriques Non-Négociables :
- **Fonds dominants :** Blanc Pur (`#FFFFFF`), Gris Technique (`#F1F5F9`) ou Bleu Nuit Ardoise profond (`#0F172A`).
- **Bleu Technique BTP (`#1F3C88`) :** Action primaire, autorité institutionnelle, badges clés.
- **Règle des 10% d'Orange Chantier (`#F27100`) :** Strictement réservé aux boutons d'action stratégiques (devis sous 48h), badges prioritaires et compteurs d'impact. **Interdiction formelle de l'utiliser en grand aplat de fond de section.**
- **Contraste WCAG AA (≥ 4.5:1) :** Obligatoire pour tous les textes et étiquettes.

### Règles Typographiques :
- **Titres :** `font-heading` (`Poppins, sans-serif`, `tracking-tight`).
- **Corps :** `font-sans` (`Inter, sans-serif`).
- **Micro-labels :** En majuscules obligatoires (`uppercase tracking-wider` ou `tracking-widest`, `text-xs`).
- **Chiffres d'actifs :** Toujours surdimensionnés (`text-3xl` à `text-5xl`).

### Règles de Formes & Géométrie :
- **Angles solides :** `rounded-md` (6px) pour les boutons/champs, `rounded-xl` (12px) pour les cartes. Formes molles et `rounded-3xl` formellement proscrites.
- **Bordures nettes :** Toujours délimiter les cartes avec un liseré net de 1px (`border border-border` ou `border-white/10`).

---

## 2. Intégrité des Données et Preuves Métier

- Se référer à [PRODUCT.md](file:///home/hamidou/Documents/site-begec-btp_2/PRODUCT.md) pour la vérité produit.
- Mettre en avant les actifs réels de BEGEC TP : station de concassage et 2 centrales d'enrobage à Kouriya, 100+ engins lourds, présence dans 8+ préfectures en Guinée, topographie certifiée et devis sous 48h.
- Ne jamais fabriquer de faux avis ou de fausses promesses techniques.

---

## 3. Base de Connaissances Graphify

- Après modification de fichiers de code, exécuter `graphify update .` pour maintenir le graphe de connaissances à jour.
