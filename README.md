### Wersja Polska

## Uruchamianie

Otwórz katalog projektu w terminalu.

Uruchom następującą komendę:
`npm run api:prod`

Otwórz linki wyświetlone w terminalu.

**Konfiguracja i budowanie projektu**

Jeśli musisz skonfigurować i zbudować projekt, wykonaj poniższe polecenia:

Zainstaluj pakiety
`npm install`

Uruchom skrypt seedujący (pomiń ten krok, jeśli został już wykonany)
`npm run script apps/api/src/seed.ts`

Uruchom serwer developerski
`npm run api`

## Dokumentacja / Użycie API

Istnieją dwie opcje dostępu do dokumentacji API:

**Opcja 1: Swagger UI (Klasyczny)**

`http://localhost:3000/api/reference`

Aby korzystać z endpointów dla administratora/klienta, najpierw zaloguj się używając endpointu logowania:

![alt text](image.png)

Skopiuj token dostępu z odpowiedzi:

![alt text](image-1.png)

Autoryzuj się używając przycisku w prawym górnym rogu strony:

![alt text](image-2.png)

Teraz masz dostęp do endpointów administratora/klienta.

**Opcja 2: Scalar UI (Nowoczesny)**

`http://localhost:3000/api/scalar`

Podobnie jak wyżej, musisz się autoryzować, aby uzyskać dostęp do endpointów administratora/klienta. Zaloguj się, a następnie wypełnij ustawienia autoryzacji na górze strony:

![alt text](image-3.png)

![alt text](image-4.png)

## Struktura kodu

Główny kod źródłowy projektu znajduje się w `apps/api/src`.

Na przykład model książek (Book) znajduje się w pliku `apps/api/src/app/books/book.entity.ts`.

DTO dla książek znajdują się w katalogu `apps/api/src/app/books/dto`.

Projekt składa się z trzech głównych modułów:

* `apps/api/src/app/books`
* `apps/api/src/app/loans`
* `apps/api/src/app/users`

Każdy z nich zawiera własne serwisy, modele, DTO, kontrolery itp.

---

### English Version

## Run

Open the project directory in your terminal.

Run the following command:
`npm run api:prod`

Open the links displayed in the terminal.

**Project Setup and Build**

If you need to set up and build the project, follow these commands:

Install packages
`npm install`

Run the seed script (skip this step if already initialized)
`npm run script apps/api/src/seed.ts`

Run the development server
`npm run api`

## Documentation / API Usage

There are two options for accessing the API documentation:

**Option 1: Swagger UI (Classic)**

`http://localhost:3000/api/reference`

To use admin/customer endpoints, first log in using the login endpoint:

![alt text](image.png)

Copy the access token from the response:

![alt text](image-1.png)

Authorize using the button in the top right corner of the page:

![alt text](image-2.png)

You can now access admin/customer endpoints.

**Option 2: Scalar UI (Modern)**

`http://localhost:3000/api/scalar`

Similarly, you must authorize to access admin/customer endpoints. Log in, then fill in the authorization settings at the top of the page:

![alt text](image-3.png)

![alt text](image-4.png)

## Code Structure

The main project source code is located in `apps/api/src`.

For example, the Book model is in `apps/api/src/app/books/book.entity.ts`.

DTOs for books are in the `apps/api/src/app/books/dto` directory.

The project consists of three main modules:

* `apps/api/src/app/books`
* `apps/api/src/app/loans`
* `apps/api/src/app/users`

Each module contains its own services, models, DTOs, controllers, etc.