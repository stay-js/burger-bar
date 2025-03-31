# Burger Bár - Dokumentáció

## Hostolt webalkalmazás elérése: [burger-bar.znagy.hu](https://burger-bar.znagy.hu)

## 1. Fejlesztői Dokumentáció

### 1.1. Projekt Áttekintés

A Burger Bár egy Next.js-alapú webalkalmazás, amely egy hamburgerezőnek biztosít online jelenlétet. Az alkalmazás főbb funkciói:
- Étlap megjelenítése
- Asztalfoglalási rendszer
- Adminisztratív API-k a tartalom kezeléséhez

A projekt a Next.js keretrendszeren alapul, TypeScript nyelven íródott, és a következő főbb technológiákat használja:
- **Next.js**: React keretrendszer szerver oldali renderelési képességekkel
- **Drizzle ORM**: TypeScript alapú ORM adatbázis-kezeléshez
- **Zod**: Séma-validáció
- **React Hook Form**: Űrlapkezelés
- **Tailwind CSS**: CSS keretrendszer
- **Shadcn UI**: UI komponens könyvtár
- **MySQL**: Relációs adatbázis-kezelő rendszer

### 1.2. Projekt Struktúra

```
web/
├── src/
│   ├── app/
│   │   ├── api/            # API útvonalak
│   │   ├── asztalfoglalas/ # Asztalfoglalási oldal
│   │   ├── menu/           # Menü oldal
│   │   ├── layout.tsx      # Oldalak közötti közös elrendezése
│   │   └── page.tsx        # Főoldal
│   ├── components/         # Újrafelhasználható komponensek
│   ├── lib/                # Segédkönyvtárak és metódusok
│   ├── server/             # Szerver oldali kód
│   │   └── db/             # Adatbázis sémák
│   └── styles/             # Globális stílusok
```

### 1.3. Adatbázis Séma

Az alkalmazás két fő adatbázis táblát használ:

#### 1.3.1. Asztalfoglalás (`table-reservation`)

```typescript
export const tableReservations = createTable("table-reservation", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  phone: varchar("phone", { length: 256 }).notNull(),
  date: datetime("date").notNull(),
  people: int("people").notNull(),
  message: varchar("message", { length: 512 }),
});
```

#### 1.3.2. Menü (`menu`)

```typescript
export const menu = createTable("menu", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 256 }).notNull(),
  price: int("price").notNull(),
  description: varchar("description", { length: 512 }).notNull(),
  image: varchar("image", { length: 256 }).notNull(),
});
```

### 1.4. API Végpontok

Az alkalmazás RESTful API-kat biztosít az adatok kezeléséhez:

#### 1.4.1. Menü API (`/api/menu`)

| Metódus | Funkció                    | Leírás                             |
|---------|----------------------------|-----------------------------------|
| GET     | Menüelemek lekérdezése     | Lekéri az összes menüelemet        |
| POST    | Új menüelem létrehozása    | Létrehoz egy új menüelemet         |
| PATCH   | Menüelem frissítése        | Frissíti egy létező menüelem adatait |
| DELETE  | Menüelemek törlése         | Törli a megadott menüelemeket       |

#### 1.4.2. Asztalfoglalás API (`/api/reservations`)

| Metódus | Funkció                    | Leírás                            |
|---------|----------------------------|----------------------------------|
| GET     | Foglalások lekérdezése     | Lekéri az összes foglalást        |
| POST    | Új foglalás létrehozása    | Létrehoz egy új foglalást         |
| PATCH   | Foglalás frissítése        | Frissíti egy létező foglalás adatait |
| DELETE  | Foglalások törlése         | Törli a megadott foglalásokat     |

### 1.5. Közös API Absztrakciók

Az alkalmazás közös absztrakciókat használ az API végpontok megvalósításához:

#### 1.5.1. `createNew.ts`

Új elemek létrehozása Zod validációval.

```typescript
export async function createNew<T extends MySqlTable, U extends ZodSchema>(
  request: NextRequest,
  table: T,
  validator: U,
)
```

#### 1.5.2. `getAllFromTable.ts`

Összes elem lekérdezése egy táblából.

```typescript
export async function getAllFromTable<T extends MySqlTable>(table: T)
```

#### 1.5.3. `updatePartial.ts`

Meglévő elem részleges frissítése.

```typescript
export async function updatePartial<
  T extends MySqlTable & {
    id: Column<ColumnBaseConfig<ColumnDataType, string>, object, object>;
  },
  U extends ZodObject<ZodRawShape & { id: z.ZodNumber }>,
>(request: NextRequest, table: T, validator: U)
```

#### 1.5.4. `deleteFromTable.ts`

Elemek törlése azonosítók alapján.

```typescript
export async function deleteFromTable<
  T extends MySqlTable & {
    id: Column<ColumnBaseConfig<ColumnDataType, string>, object, object>;
  },
>(request: NextRequest, table: T)
```

### 1.6. Asztalfoglalási Folyamat

Az asztalfoglalás a következő folyamatot követi:

1. A felhasználó kitölti az asztalfoglalási űrlapot a `/asztalfoglalas` oldalon
2. Az űrlap kliens oldali validációt végez (Zod + React Hook Form)
3. A validált adatok elküldésre kerülnek a `saveTableReservation` szerver akción keresztül
4. Az akció validálja az adatokat és elmenti az adatbázisba
5. Siker vagy hiba esetén értesítés jelenik meg

```typescript
export default async function saveTableReservation(formData: FormSchema) {
  const result = formSchema.safeParse(formData);

  if (!result.success) return { success: false };

  // Időzóna kezelés...

  try {
    await db.insert(tableReservations).values(toInsert).execute();
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
```

### 1.7. Cache Invalidáció

A menü adatok cache-elése és invalidációja a Next.js cache rendszerén keresztül történik:

```typescript
export async function POST(request: NextRequest) {
  const response = createNew(request, menu, menuSchema);
  revalidateTag("menu");
  return response;
}
```

### 1.8. Fejlesztési Útmutató

#### 1.8.1. Új API Végpont Létrehozása

- Új mappa létrehozása az `app/api` könyvtárban
- Új `route.ts` fájl létrehozása a mappában, amely exportálja a megfelelő HTTP metódus függvényeket
- Amennyiben szükséges közös absztrakciók (`createNew`, `getAllFromTable`, stb.) használata
- Amennyiben szükséges Zod validációs sémák definiálása

#### 1.8.2. Új Komponens Létrehozása

- Új `.tsx` fájl létrehozása a `components` könyvtárban
- Szükséges UI komponenseket és könyvtárakat importálása
- Komponens implementálása és exportálása

#### 1.8.3. Új Oldal Létrehozása

- Új mappa létrehozása az `app` könyvtárban
- Új `page.tsx` fájl létrehozása a mappában, amely exportálja az oldal komponenst
- Metaadatok definiálása a `createMetadata` segédfüggvénnyel

### 1.9. Futtatás és Fejlesztés

#### 1.9.1. Előkészületek

- `.env-example` fájlban találhatóak a szükséges környezeti változók. Ezt a fájlt át kell nevezni `.env`-re.
  - `DATABASE_URL` felülírása amennyiben a hostolt adatbázist szeretnénk használni.
- Amennyiben még nincs, Node.js telepítése: [https://nodejs.org/](https://nodejs.org/)
- Amennyiben még nincs, pnpm telepítése (opcionális lépes): `npm install -g pnpm`
- Függőségek telepítése: `pnpm install` vagy `npm install`

#### 1.9.2. Dev szerver futtatása

PNPM:

```bash
pnpm dev
```

NPM:

```bash
npm run dev
```

#### 1.9.3. Buildelés és futtatás

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

### 1.10. Felhasznált képek:

- [Header Background](https://www.goodfon.com/food/wallpaper-gamburger-burger-mcdonald-s-perets.html)
- [History Background](https://stockcake.com/i/juicy-gourmet-burger_70090_3048)

## 2. Felhasználói Dokumentáció

### 2.1. A Burger Bár Weboldal Használata

A Burger Bár weboldal lehetővé teszi, hogy megtekintse étlapunkat és asztalt foglaljon vendéglőnkbe. Az alábbiakban megtalálja a különböző funkciók használatának leírását.

### 2.2. Navigáció

A weboldal felső részén található navigációs sávban könnyen elérheti a fő oldalakat:
- **Főoldal**: A weboldal nyitólapja
- **Menü**: Teljes étlapunk megtekintése
- **Asztalfoglalás**: Online asztalfoglalás

### 2.3. Étlap Böngészése

Az étlap megtekintéséhez kövesse az alábbi lépéseket:

- Kattintson a "Menü" gombra a navigációs sávban vagy a főoldalon található "Menü megtekintése" gombra
- Az étlapon megtekintheti hamburgereinket, azok leírását és árát
- A termékek kártyákban jelennek meg, amelyek tartalmazzák:
   - A hamburger nevét
   - A hamburger képét
   - Rövid leírást
   - Árat

### 2.4. Asztalfoglalás

Asztal foglalásához kövesse az alábbi lépéseket:

- Kattintson az "Asztalfoglalás" gombra a navigációs sávban vagy a főoldalon található "Asztalfoglalás" gombra
- Töltse ki a foglalási űrlapot a következő adatokkal:
   - **Név**: Az Ön teljes neve (kötelező)
   - **E-mail**: Az Ön e-mail címe (kötelező)
   - **Telefonszám**: Az Ön telefonszáma (kötelező)
   - **Dátum**: A foglalás dátuma (kötelező)
   - **Időpont**: A foglalás időpontja (kötelező)
   - **Hány főre?**: A vendégek száma (kötelező)
   - **Üzenet**: Opcionális megjegyzés a foglaláshoz
- Kattintson a "Foglalás" gombra
- Sikeres foglalás esetén értesítést kap a visszaigazolásról
- Kérjük, vegye figyelembe, hogy a foglalás csak a visszaigazolást követően tekinthető biztosnak
