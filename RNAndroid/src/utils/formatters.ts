const DEFAULT_LOCALE = 'pl-PL';

export const formatCurrency = (
  value: number | string,
  currency: string = 'USD',
  options: Intl.NumberFormatOptions = {}
): string => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) {
    return 'N/A';
  }

  const defaultOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: numValue < 1 ? 6 : 2,
  };

  return new Intl.NumberFormat(DEFAULT_LOCALE, {
    ...defaultOptions,
    ...options,
  }).format(numValue);
};

export const formatPercentage = (
  value: number | string,
  options: Intl.NumberFormatOptions = {}
): string => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) {
    return 'N/A';
  }

  const defaultOptions: Intl.NumberFormatOptions = {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: 'always',
  };

  return new Intl.NumberFormat(DEFAULT_LOCALE, {
    ...defaultOptions,
    ...options,
  }).format(numValue / 100);
};

export const formatNumber = (
  value: number | string,
  options: Intl.NumberFormatOptions = {}
): string => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) {
    return 'N/A';
  }

  const defaultOptions: Intl.NumberFormatOptions = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  };

  return new Intl.NumberFormat(DEFAULT_LOCALE, {
    ...defaultOptions,
    ...options,
  }).format(numValue);
};

export const formatDate = (
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {}
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
    return 'N/A';
  }

  const defaultOptions: Intl.DateTimeFormatOptions = {
    dateStyle: 'medium',
    timeStyle: 'short',
  };

  return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
    ...defaultOptions,
    ...options,
  }).format(dateObj);
};

export const formatMarketCap = (value: number | string): string => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) {
    return 'N/A';
  }

  if (numValue >= 1e9) {
    return `$${(numValue / 1e9).toFixed(2)}B`;
  }
  if (numValue >= 1e6) {
    return `$${(numValue / 1e6).toFixed(2)}M`;
  }
  return `$${numValue.toFixed(2)}`;
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 6
  }).format(price);
};