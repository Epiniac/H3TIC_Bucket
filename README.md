# How to Run

- **make**

  Lance l'application H3TIC BUCKET.

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

- **make mariadb:**

  ```sh
  docker exec -it bucket-db-1 mariadb -u root -p
  ```

  Après avoir tapé cette commande, on vous demandera le mot de passe pour l'utilisateur root, et une fois entré correctement, vous serez en mesure d'exécuter des commandes SQL dans cette instance MariaDB en utilisant l'interface en ligne de commande.

- **make bash:**

  ```sh
  docker exec -it bucket-backend-1 /bin/bash
  ```

  Accéder à un conteneur Docker pour ouvrir un shell interactif dans un environnement de type Bash

- **make clean:**
  ```sh
  docker compose down -v
  rm -rf pgdata
  ```
  Arrête les conteneurs et supprime les volumes associés, effaçant les données stockées et supprime le dossier _pgdata_, qui pourrait contenir des données de persistance PostgreSQL (ou autres données) sur le système de fichiers hôte.
