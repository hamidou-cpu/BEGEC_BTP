---
description: Règle impérative de synchronisation et push automatique sur GitHub
globs: ["*"]
alwaysApply: true
---

# Synchronisation et Push Systématique sur GitHub

À la fin de chaque tâche où du code ou de la documentation est modifié, corrigé ou créé et vérifié :
1. Exécuter `graphify update .` si des fichiers de code sont modifiés.
2. Ajouter les fichiers au suivi Git (`git add`).
3. Créer un commit explicite (`git commit -m "..."`).
4. **Pousser immédiatement et impérativement les modifications sur le dépôt distant (`git push origin <branche>`)**.
5. Ne jamais laisser de modifications validées non poussées sur GitHub.
