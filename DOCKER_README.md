# 🐳 Guide Docker - Système IoT Nodalis

Ce guide vous explique comment déployer le système IoT Nodalis avec Docker.

## 📋 Prérequis

- Docker 20.10+
- Docker Compose 2.0+
- 4GB RAM libre
- 10GB espace disque

## 🚀 Démarrage rapide

### 1. Configuration initiale

```bash
# Cloner le projet
git clone https://github.com/JorgeReyes2023/anteproyecto.git
cd anteproyecto

# Configurer les variables d'environnement
cp .env.example .env
# Éditez .env avec vos valeurs
```

### 2. Lancement en production

```bash
# Linux/MacOS
./scripts/start.sh

# Windows
scripts\start.bat

# Ou manuellement
docker-compose up -d
```

### 3. Accès aux services

- **Frontend**: http://localhost
- **Backend API**: http://localhost:3000
- **Documentation API**: http://localhost:3000/api-docs
- **Health Check**: http://localhost:3000/api/health

## 🔧 Mode développement

Pour le développement avec hot-reload :

```bash
# Linux/MacOS
./scripts/dev.sh

# Ou manuellement
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

URLs de développement :

- **Frontend**: http://localhost:4200 (hot-reload)
- **Backend**: http://localhost:3000 (nodemon)

## 📊 Gestion des services

### Voir les logs

```bash
# Tous les services
docker-compose logs -f

# Service spécifique
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### Arrêter les services

```bash
docker-compose down
```

### Redémarrer un service

```bash
docker-compose restart backend
```

### Rebuild complet

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## 🗃️ Gestion des données

### Sauvegarde de la base de données

```bash
docker-compose exec postgres pg_dump -U postgres nodalis_iot > backup.sql
```

### Restauration

```bash
docker-compose exec -T postgres psql -U postgres nodalis_iot < backup.sql
```

### Reset complet (⚠️ Efface toutes les données)

```bash
docker-compose down -v --remove-orphans
docker-compose up -d
```

## 🏗️ Architecture Docker

### Services déployés

| Service            | Port       | Description                     |
| ------------------ | ---------- | ------------------------------- |
| **frontend**       | 80         | Interface Angular avec Nginx    |
| **backend**        | 3000       | API Node.js avec Express        |
| **mqtt_processor** | -          | Processeur MQTT en arrière-plan |
| **postgres**       | 5432       | Base de données PostgreSQL      |
| **redis**          | 6379       | Cache et pub/sub                |
| **mosquitto**      | 1883, 9001 | Broker MQTT + WebSocket         |

### Volumes persistants

- `postgres_data`: Données PostgreSQL
- `redis_data`: Cache Redis
- `mosquitto_data`: Messages MQTT persistants
- `backend_logs`: Logs de l'API
- `mqtt_logs`: Logs du processeur MQTT

## 🔒 Sécurité

### Variables d'environnement importantes

```env
# À changer absolument en production !
POSTGRES_PASSWORD=secure_postgres_password_2024
REDIS_PASSWORD=secure_redis_password_2024
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-2024
MQTT_PASSWORD=secure_mqtt_password_2024
```

### Générer des secrets sécurisés

```bash
# JWT Secret
openssl rand -hex 32

# Mots de passe
openssl rand -base64 32
```

## 🩺 Monitoring et santé

### Health checks automatiques

Tous les services ont des health checks intégrés :

```bash
# Vérifier l'état
docker-compose ps

# Health check manuel
curl http://localhost:3000/api/health
```

### Métriques et monitoring

```bash
# Utilisation des ressources
docker stats

# Espace disque des volumes
docker system df
```

## 🛠️ Dépannage

### Problèmes courants

1. **Port déjà utilisé**

   ```bash
   # Changer les ports dans docker-compose.yml
   ports:
     - "8080:80"  # Au lieu de 80:80
   ```

2. **Problème de permissions**

   ```bash
   # Linux/MacOS
   sudo chown -R $USER:$USER .
   chmod +x scripts/*.sh
   ```

3. **Services ne démarrent pas**

   ```bash
   # Vérifier les logs
   docker-compose logs

   # Rebuild
   docker-compose build --no-cache
   ```

4. **Base de données corrompue**
   ```bash
   # Reset de la DB (⚠️ perte de données)
   docker-compose down -v
   docker volume rm anteproyecto_postgres_data
   docker-compose up -d
   ```

### Logs utiles

```bash
# Logs en temps réel
docker-compose logs -f --tail=100

# Logs d'un service
docker-compose logs backend | head -50

# Erreurs uniquement
docker-compose logs | grep ERROR
```

## 📈 Production

### Optimisations recommandées

1. **Utiliser un reverse proxy (Traefik/Nginx)**
2. **Configurer SSL/TLS**
3. **Mettre en place la surveillance (Prometheus)**
4. **Sauvegardes automatiques**
5. **Rotation des logs**

### Exemple avec Traefik

```yaml
# Ajouter aux services dans docker-compose.yml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.nodalis.rule=Host(`your-domain.com`)"
  - "traefik.http.routers.nodalis.tls.certresolver=letsencrypt"
```

## 🤝 Support

Pour toute question ou problème :

1. Vérifiez les logs : `docker-compose logs`
2. Consultez le health check : `curl localhost:3000/api/health`
3. Ouvrez une issue GitHub avec les logs complets

---

**🏗️ Architecture mise en place :**

- ✅ Multi-stage Dockerfiles optimisés
- ✅ Hot-reload pour développement
- ✅ Health checks automatiques
- ✅ Volumes persistants configurés
- ✅ Réseau isolé sécurisé
- ✅ Scripts de gestion inclus
