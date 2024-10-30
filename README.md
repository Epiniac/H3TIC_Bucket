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
