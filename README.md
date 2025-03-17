# Burger Bár

## Adatbázis

### Előkészületek

- `.env-example` fájlban találhatóak az adatbázishoz szükséges adatok. Ezt a fájlt át kell nevezni `.env`-re.
- Első indítás esetén `db.sql` fájlban található SQL kód futtatása.

### Futtatás

```bash
docker compose up -d
```

## Webalkalmazás

### Előkészületek

- `.env-example` fájlban találhatóak az adatbázishoz szükséges adatok. Ezt a fájlt át kell nevezni `.env`-re.
- Amennyiben még nincs, Node.js telepítése: [https://nodejs.org/](https://nodejs.org/)
- Amennyiben még nincs, pnpm telepítése (opcionális lépes): `npm install -g pnpm`
- Függőségek telepítése: `pnpm install` vagy `npm install`

### Dev szerver futtatása

PNPM:

```bash
pnpm dev
```

NPM:

```bash
npm run dev
```

### Buildelés és futtatás

PNPM:

```bash
pnpm build
pnpm start
```

NPM:

```bash
npm run build
npm run start
```

## Asztali alkalmazás

### Előkészületek

- `.env-example` fájlban találhatóak az adatbázishoz szükséges adatok. Ezt a fájlt át kell nevezni `.env`-re.

### Futtatás

```bash
dotnet run
```
