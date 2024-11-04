import * as Notifications from 'expo-notifications';
import { CryptoApi } from '../api/CryptoApi';
import { Platform } from 'react-native';

export class BitcoinNotificationService {
  private static instance: BitcoinNotificationService;
  private timer: ReturnType<typeof setInterval> | null = null;
  private readonly BITCOIN_ID = 'btc-bitcoin';
  private readonly NOTIFICATION_INTERVAL = 60000; // 1 minuta

  private constructor() {}

  public static getInstance(): BitcoinNotificationService {
    if (!BitcoinNotificationService.instance) {
      BitcoinNotificationService.instance = new BitcoinNotificationService();
    }
    return BitcoinNotificationService.instance;
  }

  public async initialize(): Promise<void> {
    await this.requestPermissions();
    await this.configureNotifications();
  }

  private async requestPermissions(): Promise<boolean> {
    const { status } = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
      },
    });
    return status === 'granted';
  }

  private async configureNotifications(): Promise<void> {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  }

  public startBackgroundUpdates(): void {
    if (this.timer) {
      return;
    }

    this.timer = setInterval(async () => {
      try {
        const api = CryptoApi.getInstance();
        const bitcoin = await api.getCoinDetails(this.BITCOIN_ID);
        
        if (bitcoin && bitcoin.quotes?.USD) {
          const price = bitcoin.quotes.USD.price;
          const change = bitcoin.quotes.USD.percent_change_24h;
          
          await Notifications.scheduleNotificationAsync({
            content: {
              title: 'Aktualizacja ceny Bitcoin',
              body: `Cena: $${price.toFixed(2)}\nZmiana 24h: ${change >= 0 ? '+' : ''}${change.toFixed(2)}%`,
              data: { type: 'bitcoin_update' },
            },
            trigger: null,
          });
        }
      } catch (error) {
        console.error('Błąd podczas aktualizacji powiadomień Bitcoin:', error);
      }
    }, this.NOTIFICATION_INTERVAL);
  }

  public stopBackgroundUpdates(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}