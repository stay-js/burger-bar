# Burger Bár Admin Alkalmazás

## 1. Fejlesztői Dokumentáció

### 1.1. Az alkalmazás áttekintése

A Burger Bár Admin egy WPF alapú asztali alkalmazás, amely egy étterem adminisztrációs feladatainak ellátására szolgál. Az alkalmazás lehetővé teszi az étterem menüjének, a foglalásoknak és a rendeléseknek a kezelését. Az alkalmazás a .NET 8.0 keretrendszerre épül és a Windows Presentation Foundation (WPF) technológiát használja a felhasználói felület megjelenítéséhez.

### 1.2. Architektúra

Az alkalmazás a következő fő komponensekből áll:

- **Desktop projekt**: A felhasználói felületet és a logika egy részét tartalmazza
  - **MainWindow**: Az alkalmazás fő ablaka, amely tartalmazza a navigációt
  - **MainMenu**: A főmenü felülete
  - **MenuPage**: A menü kezelésére szolgáló felület
  - **ReservationsPage**: A foglalások kezelésére szolgáló felület
  - **OrderPage**: A rendelés létrehozására szolgáló felület
  - **ModifyMenuDialog**: A menüelemek módosítására és létrehozására szolgáló párbeszédablak
  - **ModifyReservationDialog**: A foglalások módosítására és létrehozására szolgáló párbeszédablak
- **Desktop_Lib projekt**: Az adatmodelleket és a többször használt funkciókat tartalmazza
- **Desktop_Test projekt**: A Unit teszteket tartalmazza a Desktop_Lib projekthez

### 1.3. API kommunikáció

Az alkalmazás a **web projekt**ben található API-val kommunikál a **Desktop_Lib** projektben található **ApiClient** osztályon keresztül. A kommunikáció aszinkron módon történik, és a következő végpontokat használja:

- `/api/menu`: Menüelemek lekérése, létrehozása, módosítása és törlése
- `/api/reservations`: Foglalások lekérése, létrehozása, módosítása és törlése

Felhasznált HTTP metódusok:

- **GET**: Adatok lekérése
- **POST**: Új adatok létrehozása
- **PATCH**: Meglévő adatok módosítása
- **DELETE**: Adatok törlése

### 1.4. Adatmodellek

A fő adatmodellek a következők:

**Menü elem**:

```csharp
// MenuItem osztály
public record MenuItem(int ID, string Name, int Price, string Description, string Image);

// CreateMenuItem osztály új elem létrehozásához
public record CreateMenuItem(string Name, int Price, string Description, string Image);
```

**Foglalás**:

```csharp
// ReservationItem osztály
public record ReservationItem(int ID, string Name, string Email, string Phone, DateTime Date, int People, string? Message);

// CreateReservationItem osztály új foglalás létrehozásához
public record CreateReservationItem(string Name, string Email, string Phone, string Date, int People);

// ModifyReservationItem osztály foglalás módosításához
public record ModifyReservationItem(int ID, string Name, string Email, string Phone, string Date, int People);
```

**Rendelés:**:

```csharp
// OrderItem rekord
public record OrderItem(MenuItem Item, int Amount)
{
    public int Total => Item.Price * Amount;
}
```

### 1.5. Validáció

Az alkalmazás validációhoz a `Validator` osztályt használja, amely a következő metódusokat tartalmazza:

- `ValidateInt`: Ellenőrzi, hogy a megadott érték egész szám-e
- `ValidateEmail`: Ellenőrzi, hogy a megadott érték érvényes e-mail-e
- `ValidatePhoneNumber`: Ellenőrzi, hogy a megadott érték érvényes telefonszám-e
- `ValidateTime`: Ellenőrzi, hogy a megadott érték érvényes időpont-e _(HH:MM formátumban)_

### 1.6. Hibaüzenetek

A hibaüzenetek megjelenítésére a `MessageBoxHelper` statikus osztály szolgál, amely a következő metódusokat tartalmazza:

- **Error**: Általános hibaüzenet megjelenítése
- **EmptyFieldsWarning**: Üres mezők esetén megjelenő figyelmeztetés
- **InvalidPriceWarning**: Érvénytelen ár esetén megjelenő figyelmeztetés
- **InvalidTimeWarning**: Érvénytelen időpont esetén megjelenő figyelmeztetés
- **InvalidPeopleCountWarning**: Érvénytelen vendégszám esetén megjelenő figyelmeztetés
- **InvalidAmountWarning**: Érvénytelen mennyiség esetén megjelenő figyelmeztetés
- **InvalidEmailWarning**: Érvénytelen e-mail cím esetén megjelenő figyelmeztetés
- **InvalidPhoneNumberWarning**: Érvénytelen telefonszám esetén megjelenő figyelmeztetés
- **ModifyMoreThanOneWarning**: Több elem egyszerre történő módosítása esetén megjelenő figyelmeztetés
- **DeleteConfirmation**: Törlés megerősítése

### 1.7. Környezeti változók

Az alkalmazás a `.env` fájlból olvassa be a környezeti változókat a `DotEnv.Load` metódus segítségével.

- `.env-example` fájlban találhatóak a szükséges környezeti változók. Ezt a fájlt át kell nevezni `.env`-re.
  - Az `API_URL`-t és `API_KEY`-t felül kell írni amennyiben a hostolt API-t szeretnénk használni.

### 1.8. Fejlesztési útmutató

#### Új oldal hozzáadása

- Új `UserControl` osztály létrehozása a kívánt felülettel
- Navigációs metódus hozzáadása a `MainWindow` osztályhoz
- `MainMenu` osztály kiegészítése a megfelelő gombbal és eseménykezelővel

#### Új API végpont használata

- Új adatmodell létrehozása a `Desktop_Lib` projektben
- `ApiClient` osztály kiegészítése a kommunikáció megvalósításával, vagy meglévő metódusok használata
- Megfelelő hibakezelés implementálása
