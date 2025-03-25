# Adatbázis

## Előkészületek

- `.env-example` fájlban találhatóak a szükséges környezeti változók. Ezt a fájlt át kell nevezni `.env`-re.

## Futtatás lokálisan

```bash
docker compose up -d
```

## Első indítás esetén

- Adatbázis létrehozása:

```mysql
CREATE DATABASE IF NOT EXISTS `burger-bar`
CHARACTER SET utf8
COLLATE utf8_hungarian_ci;
```

- Táblák létrehozása a `Drizzle` schema alapján:

```bash
cd web
# projekt futtatásához szükséges előészületek után:
pnpm run db:push
# amennyiben nincs pnpm telepítve
# npm run db:push
```

- Menu tábla feltöltése a `menu.sql` fájlban található adatokkal.

## Hostolt adatbázis elérése

- Host: `mysql-znagy-gh-znagy-gh.g.aivencloud.com`
- Port: `25828`
