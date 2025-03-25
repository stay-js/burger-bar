# Webalkalmazás

## Hostolt webalkalmazás elérése: [burger-bar.znagy.hu](https://burger-bar.znagy.hu)

## Előkészületek

- `.env-example` fájlban találhatóak a szükséges környezeti változók. Ezt a fájlt át kell nevezni `.env`-re.
  - `DATABASE_URL` felülírása amennyiben a hostolt adatbázist szeretnénk használni.
- Amennyiben még nincs, Node.js telepítése: [https://nodejs.org/](https://nodejs.org/)
- Amennyiben még nincs, pnpm telepítése (opcionális lépes): `npm install -g pnpm`
- Függőségek telepítése: `pnpm install` vagy `npm install`

## Dev szerver futtatása

PNPM:

```bash
pnpm dev
```

NPM:

```bash
npm run dev
```

## Buildelés és futtatás

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

## Felhasznált képek:

- [Header Background](https://www.goodfon.com/food/wallpaper-gamburger-burger-mcdonald-s-perets.html)
- [History Background](https://stockcake.com/i/juicy-gourmet-burger_70090_3048)
