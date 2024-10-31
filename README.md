# CryptoNews - Aplikacja do Śledzenia Kryptowalut

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

## Planowane Funkcje

### 🪙 Moduł Kryptowalut
- Zaawansowane filtry i sortowanie
- Możliwość dodawania kryptowalut do ulubionych
- Szczegółowe analizy techniczne
- Powiadomienia o zmianach cen

### 📰 Centrum Wiadomości
- Dodanie większej liczby źródeł wiadomości
- Możliwość zapisywania artykułów do późniejszego przeczytania
- Personalizacja feedu wiadomości
- Pełne artykuły dostępne bezpośrednio w aplikacji

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