# ===== MAKEFILE POUR SYSTÈME IOT NODALIS =====

.PHONY: help build start stop dev logs clean reset health

# Variables
COMPOSE_FILE := docker-compose.yml
COMPOSE_DEV := docker-compose.dev.yml

help: ## Afficher l'aide
	@echo "🚀 Commandes disponibles pour le système IoT Nodalis :"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'
	@echo ""

build: ## Construire toutes les images Docker
	@echo "🔨 Construction des images..."
	docker-compose build --no-cache

start: ## Démarrer tous les services en production
	@echo "🚀 Démarrage en mode production..."
	@if [ ! -f .env ]; then \
		echo "❌ Fichier .env manquant! Copiez .env.example vers .env"; \
		exit 1; \
	fi
	docker-compose up -d
	@echo "✅ Services démarrés!"
	@echo "🌐 Frontend: http://localhost"
	@echo "🔧 API: http://localhost:3000"

stop: ## Arrêter tous les services
	@echo "🛑 Arrêt des services..."
	docker-compose down
	@echo "✅ Services arrêtés!"

dev: ## Démarrer en mode développement avec hot-reload
	@echo "🔧 Démarrage en mode développement..."
	@if [ ! -f .env ]; then \
		echo "❌ Fichier .env manquant! Copiez .env.example vers .env"; \
		exit 1; \
	fi
	docker-compose -f $(COMPOSE_FILE) -f $(COMPOSE_DEV) up --build

logs: ## Voir tous les logs en temps réel
	docker-compose logs -f

logs-backend: ## Voir les logs du backend
	docker-compose logs -f backend

logs-frontend: ## Voir les logs du frontend
	docker-compose logs -f frontend

logs-db: ## Voir les logs de la base de données
	docker-compose logs -f postgres

health: ## Vérifier l'état de tous les services
	@echo "🩺 Vérification de l'état des services..."
	docker-compose ps
	@echo ""
	@echo "🌐 Test du health check API..."
	@curl -f http://localhost:3000/api/health 2>/dev/null | jq . || echo "❌ API non accessible"

restart: ## Redémarrer tous les services
	@echo "🔄 Redémarrage des services..."
	docker-compose restart
	@echo "✅ Services redémarrés!"

clean: ## Nettoyer les images et conteneurs non utilisés
	@echo "🧹 Nettoyage des ressources Docker..."
	docker system prune -f
	docker volume prune -f
	@echo "✅ Nettoyage terminé!"

reset: ## ⚠️  RESET COMPLET - Supprime toutes les données
	@echo "⚠️  ATTENTION: Cette action va supprimer TOUTES les données!"
	@read -p "Êtes-vous sûr? (y/N): " confirm && [ "$$confirm" = "y" ]
	docker-compose down -v --remove-orphans
	docker system prune -af
	@echo "🗑️  Reset complet effectué!"

backup-db: ## Sauvegarder la base de données
	@echo "💾 Sauvegarde de la base de données..."
	@mkdir -p backups
	docker-compose exec postgres pg_dump -U postgres nodalis_iot > backups/backup_$$(date +%Y%m%d_%H%M%S).sql
	@echo "✅ Sauvegarde créée dans backups/"

restore-db: ## Restaurer la base de données (BACKUP_FILE=path/to/backup.sql)
	@if [ -z "$(BACKUP_FILE)" ]; then \
		echo "❌ Usage: make restore-db BACKUP_FILE=path/to/backup.sql"; \
		exit 1; \
	fi
	@echo "🔄 Restauration de la base de données..."
	docker-compose exec -T postgres psql -U postgres nodalis_iot < $(BACKUP_FILE)
	@echo "✅ Restauration terminée!"

shell-backend: ## Ouvrir un shell dans le conteneur backend
	docker-compose exec backend sh

shell-db: ## Ouvrir un shell PostgreSQL
	docker-compose exec postgres psql -U postgres nodalis_iot

stats: ## Afficher les statistiques des conteneurs
	docker stats --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.PIDs}}"

setup: ## Configuration initiale du projet
	@echo "⚙️  Configuration initiale..."
	@if [ ! -f .env ]; then \
		cp .env.example .env; \
		echo "📋 Fichier .env créé depuis .env.example"; \
		echo "✏️  Éditez .env avec vos valeurs avant de continuer"; \
	else \
		echo "✅ Fichier .env déjà présent"; \
	fi
	@mkdir -p logs/backend logs/mqtt logs/nginx
	@echo "📁 Répertoires de logs créés"
	@echo "🚀 Projet configuré! Lancez 'make start' pour démarrer"

# Raccourcis
up: start
down: stop
ps: health