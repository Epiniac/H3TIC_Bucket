# H3TIC_Bucket

Faire un serveur de fichiers (un peu à la croisée entre S3 et WeTransfer)
Le but est d'avoir une base d'utilisateurs qui sont capables d'uploader des fichiers (potentiellement lourds)
Les utilisateurs ont un quota max d'upload (genre 2Go par utilisateur)
Un accès pour pouvoir gérer leurs fichiers et leurs méta-informations
Il faut pouvoir être capable de créer un lien de partage temporaire publique

# Groupes de 3

Frontend sommaire, c'est un TP backend
Rendu Vendredi soir

## Docker + NodeJS

La documentation est obligatoire !
Pensez à moi, je vais avoir pas mal de projets à regarder, faites en sorte que ça soit facile à lancer (un Makefile et une base de données d'initialisation est la bienvenue !)

# How to Run

- **make build:**

  ```sh
  docker compose up --build
  ```

  Démarre les conteneurs définis dans le fichier _docker-compose.yml_ et force la reconstruction des images Docker. Idéal pour actualiser les images après des modifications de code ou de configuration.

- **make start:**

  ```sh
  docker compose up -d
  ```

  Démarre les conteneurs en mode détaché (en arrière-plan). Cela permet de les exécuter sans bloquer le terminal.

- **make stop:**

  ```sh
  docker compose down
  ```

  Arrête et supprime les conteneurs créés avec _docker compose up_. Les volumes et réseaux persistent, sauf si explicitement supprimés.

- **make clean:**

```sh
	docker compose down -v
	rm -rf pgdata
```

Arrête les conteneurs et supprime les volumes associés, effaçant les données stockées et supprime le dossier _pgdata_, qui pourrait contenir des données de persistance PostgreSQL (ou autres données) sur le système de fichiers hôte.
