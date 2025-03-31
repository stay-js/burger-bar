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
// MenuItem rekord
public record MenuItem(int ID, string Name, int Price, string Description, string Image);

// CreateMenuItem rekord új elem létrehozásához
public record CreateMenuItem(string Name, int Price, string Description, string Image);
```

**Foglalás**:

```csharp
// ReservationItem rekord
public record ReservationItem(int ID, string Name, string Email, string Phone, DateTime Date, int People, string? Message);

// CreateReservationItem rekord új foglalás létrehozásához
public record CreateReservationItem(string Name, string Email, string Phone, string Date, int People);

// ModifyReservationItem rekord foglalás módosításához
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

## 2. Felhasználói Dokumentáció

### 2.1. A Burger Bár Admin alkalmazás bemutatása

A Burger Bár Admin alkalmazás egy étterem adminisztrációs rendszere, amely lehetővé teszi a menü, a foglalások és a rendelések kezelését. Az alkalmazás egyszerű és intuitív felülettel rendelkezik, amely megkönnyíti a napi adminisztrációs feladatok elvégzését.

### 2.2. Rendszerkövetelmények

- **Windows 10** vagy újabb operációs rendszer
- **.NET 8.0** vagy újabb verzió
- **Internetkapcsolat** az API eléréshez

### 2.3. Első indítás

Megfeleő környezeti változók beállítása lásd: **1.7. Környezeti változók**

### 2.4. Főmenü használata

Az alkalmazás indítása után a főmenü jelenik meg, amely a következő opciókat kínálja:

- **Menü**: Az étterem étlapjának kezelése
- **Foglalások**: A vendégek által leadott foglalások kezelése
- **Rendelés**: Új rendelés összeállítása és számla nyomtatása

### 2.5. Menü kezelése

A menü kezelése opcióra kattintva megjelennek az étterem étlapján szereplő ételek és italok. Ezen a felületen a következő műveletek végezhetők el:

#### 2.5.1. Menüelem létrehozása

- Kattintson a "Létrehozás" gombra
- Töltse ki a megjelenő űrlapot a következő adatokkal:
  - Név: Az étel vagy ital neve
  - Ár: Az étel vagy ital ára (csak egész szám)
  - Leírás: Az étel vagy ital részletes leírása
  - Kép: Az étel vagy ital képének elérési útja
- Kattintson a "Mentés" gombra

#### 2.5.2. Menüelem módosítása

- Válassza ki a módosítani kívánt elemet a listából
- Kattintson a "Módosítás" gombra
- Módosítsa a kívánt adatokat
- Kattintson a "Mentés" gombra

#### 2.5.3. Menüelem törlése

- Válassza ki a törölni kívánt elem(ek)et a listából
- Kattintson a "Törlés" gombra
- A megerősítő kérdésre válaszoljon "Igen"-nel

#### 2.5.4. Lista frissítése

- A lista manuális frissítéséhez kattintson a "Frissítés" gombra.

### 2.6. Foglalások kezelése

A foglalások kezelése opcióra kattintva megjelennek a vendégek által leadott foglalások. Ezen a felületen a következő műveletek végezhetők el:

#### 2.6.1. Foglalás létrehozása

- Kattintson a "Létrehozás" gombra
- Töltse ki a megjelenő űrlapot a következő adatokkal:
  - Név: A foglaló neve
  - E-mail: A foglaló e-mail címe
  - Telefonszám: A foglaló telefonszáma
  - Dátum: A foglalás dátuma
  - Időpont: A foglalás időpontja (HH:MM formátumban)
  - Hány főre?: A vendégek száma
- Kattintson a "Mentés" gombra

#### 2.6.2. Foglalás módosítása

- Válassza ki a módosítani kívánt foglalást a listából
- Kattintson a "Módosítás" gombra
- Módosítsa a kívánt adatokat
- Kattintson a "Mentés" gombra

#### 2.6.3. Foglalás törlése

- Válassza ki a törölni kívánt foglalás(oka)t a listából
- Kattintson a "Törlés" gombra
- A megerősítő kérdésre válaszoljon "Igen"-nel

#### 2.6.4. Lista frissítése

- A lista manuális frissítéséhez kattintson a "Frissítés" gombra.

### 2.7. Rendelés kezelése

A rendelés opcióra kattintva lehetőség nyílik új rendelés összeállítására és számla nyomtatására. Ezen a felületen a következő műveletek végezhetők el:

#### 2.7.1. Étel vagy ital hozzáadása a rendeléshez

- Válassza ki a kívánt ételt vagy italt a legördülő menüből
- Adja meg a darabszámot (egész szám, alapértelmezetten 1)
- Kattintson a "Hozzáadás" gombra

#### 2.7.2. Tétel törlése a rendelésből

- Válassza ki a törölni kívánt tétel(eke)t a listából
- Kattintson a "Törlés" gombra

#### 2.7.3. Számla nyomtatása

- Állítsa össze a rendelést a fentiek szerint
- Kattintson a "Számla nyomtatása" gombra
- A megjelenő ablakban ellenőrizze a számla tartalmát
