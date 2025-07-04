This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Setup Mongo db

1. Create a mongodb Database, either hosted, for example on mongodb atlas or locally for example using mongodb compass.
2. Create a .env file in the root directory. It should look something like this:

```env
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=dbName
```

### Start developement server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## About Docker

### Projektübersicht

Im Rahmen des Moduls **M347** wurde ein Next.js-Projekt containerisiert, um es unabhängig von der lokalen Umgebung lauffähig zu machen. Dabei wurden sowohl ein optimiertes `Dockerfile` als auch eine vollständige `docker-compose.yml` erstellt, die neben dem Applikationscontainer auch einen MongoDB-Container umfasst.

### Dockerfile

Das Dockerfile nutzt **Multi-Stage-Builds** zur Trennung von Abhängigkeitsinstallation, Buildprozess und Ausführung. Es basiert auf einem Node.js Alpine Image und durchläuft folgende Stufen:

- Installation von Dependencies (`npm ci --only=production`)
- Build der Anwendung (`npm run build`)
- Bereitstellung des Endprodukts über `node server.js`

**Besonderheiten:**

- Nutzung eines dedizierten Benutzers (`nextjs`)
- Nutzung von `standalone`-Builds zur Reduktion der Imagesize
- Healthcheck via `node healthcheck.js`

### Docker Compose Setup

Die `docker-compose.yml` definiert zwei Services:

- **`app`**: Das containerisierte Next.js-Projekt
- **`mongo`**: Eine MongoDB-Datenbank mit initialem Datenbanknamen `trails_app`

**Wichtige Einstellungen:**

- Healthchecks für beide Container
- Umgebungsvariablen: `MONGODB_URI`, `MONGODB_DB_NAME`, `NODE_ENV`
- Persistenz durch ein Volume (`mongo_data`)
- Koordination der Services über `depends_on`

### Fazit

Das Projekt zeigt ein vollständiges, produktionsreifes Setup zur Containerisierung einer **SSR-basierten Webanwendung**. Es beinhaltet:

- Effiziente Buildprozesse mit Multi-Stage
- Klare Trennung von Verantwortung zwischen App und Datenbank
- Automatisierte Healthchecks zur Absicherung der Betriebsfähigkeit
- Vorbereitung für Cloud- oder Server-Deployment

Die Containerisierung erlaubt einfaches Setup, Testen und Deployment auf allen Plattformen.

### Files

- [Dockerfile](Dockerfile)
- [docker-compose.yml](docker-compose.yml)
