# CryptoNews - Aplikacja do Śledzenia Kryptowalut

## Zrealizowane zagadnienia projektowe

1. Architektura aplikacji oparta na React Native (punkt 11)
   - Wykorzystanie Context API do zarządzania stanem
   - Implementacja wzorca Repository Pattern
   - Zastosowanie Data Access Objects (DAO)

2. Wielowątkowość aplikacji (punkt 16)
   - Asynchroniczne pobieranie danych
   - Równoległe przetwarzanie operacji w tle
   - Optymalizacja wydajności poprzez cachowanie

3. Baza danych (punkt 20)
   - Implementacja SQLite poprzez DatabaseManager
   - Wykorzystanie wzorca Repository do operacji na bazie
   - System cachowania danych

4. Aplikacja w architekturze klient-serwer (punkt 33)
   - Komunikacja z API Coinpaprika
   - Obsługa błędów sieciowych
   - Zarządzanie stanem połączenia

## Testowane na
- Android 34 (API level 34)
- Pixel 7 Pro (emulator)

## Dostępne Funkcje

### 🪙 Moduł Kryptowalut
- Śledzenie kursów w czasie rzeczywistym
- Podstawowe statystyki dla każdej kryptowaluty (cena, kapitalizacja, wolumen)
- Interaktywne wykresy pokazujące historię cen
- Wyszukiwanie kryptowalut

### 📰 Centrum Wiadomości
- Agregacja najnowszych wiadomości z CoinDesk
- Automatyczne odświeżanie treści co 5 minut
- System cachowania wiadomości
- Otwieranie pełnych artykułów w przeglądarce

### ⚙️ Panel Ustawień
- Personalizacja motywu (jasny/ciemny)
- Włączanie/wyłączanie ekranu powitalnego
- Podstawowe ustawienia powiadomień

## Technologie
- React Native 0.72.6
- TypeScript 5.0.4
- Expo 49.0.0
- SQLite 2.1.0
- Axios 1.6.2
- Material Icons
- React Navigation 6.0
- Moti (animacje)

## Wymagania Systemowe
- Node.js (minimum wersja 14.0.0)
- npm (minimum wersja 6.0.0) lub yarn (minimum wersja 1.22.0)
- Android Studio (dla rozwoju na Android)
- Xcode (dla rozwoju na iOS, tylko macOS)
- Minimum 4GB RAM
- 10GB wolnego miejsca na dysku

## Instalacja i Uruchomienie

1. Sklonuj repozytorium:
```bash
git clone https://github.com/your-username/crypto-news.git
```

2. Przejdź do katalogu projektu:
```bash
cd crypto-news
```

3. Zainstaluj zależności:
```bash
npm install
```

4. Uruchom aplikację:

- Dla Android:
```bash
npm run android
```

- Dla iOS:
```bash
npm run ios
```

- Dla trybu developerskiego:
```bash
npm start
```

## Skrypty npm
- `npm start` - uruchamia serwer deweloperski Expo
- `npm run android` - uruchamia aplikację na Androidzie
- `npm run ios` - uruchamia aplikację na iOS
- `npm run web` - uruchamia aplikację w przeglądarce
- `npm test` - uruchamia testy

## Uwagi
- Aplikacja wymaga aktywnego połączenia z internetem dla pełnej funkcjonalności
- Niektóre funkcje mogą być niedostępne w zależności od platformy
- W przypadku problemów z instalacją, upewnij się że masz zainstalowane wszystkie wymagane zależności systemowe