build:
	docker compose up --build
start:
	docker compose up -d
stop:
	docker compose down
clean:
	docker compose down -v
	rm -rf pgdata