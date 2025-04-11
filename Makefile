docker-up:
	COMPOSE_BAKE=true docker compose up --build
install:
	pnpm install
setup-env:
	pnpm setup-env
build:
	pnpm build
clean:
	pnpm clean
preview:
	pnpm preview

.PHONY: docker-up install setup-env build clean preview