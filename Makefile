build:
	docker compose up --build
re:
	docker compose up
stop:
	docker compose down
clean:
	docker compose down -v
	rm -rf pgdata
	sudo rm -rf data
mariadb:
	docker exec -it bucket-db-1 mariadb -u root -p
bash:
	docker exec -it bucket-backend-1 /bin/bash
