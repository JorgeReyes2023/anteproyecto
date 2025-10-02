-- Extensions de base
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- PostgreSQL crée automatiquement jorge via POSTGRES_USER
-- Nous devons juste donner les permissions

-- Permissions par défaut pour les futurs objets créés par Prisma
ALTER DEFAULT PRIVILEGES GRANT ALL ON TABLES TO jorge;
ALTER DEFAULT PRIVILEGES GRANT ALL ON SEQUENCES TO jorge;
ALTER DEFAULT PRIVILEGES GRANT ALL ON FUNCTIONS TO jorge;

-- Permissions sur le schéma public
GRANT ALL ON SCHEMA public TO jorge;
GRANT ALL ON ALL TABLES IN SCHEMA public TO jorge;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO jorge;

-- Message de confirmation
DO $$
BEGIN
    RAISE NOTICE '=== INIT.SQL EXECUTED SUCCESSFULLY ===';
    RAISE NOTICE 'User: jorge (created by Docker)';
    RAISE NOTICE 'Database: TesisIot (created by Docker)';  
    RAISE NOTICE 'Extensions: uuid-ossp, pgcrypto loaded';
    RAISE NOTICE 'Permissions granted to jorge';
    RAISE NOTICE 'Ready for Prisma migrations!';
    RAISE NOTICE '=====================================';
END $$;