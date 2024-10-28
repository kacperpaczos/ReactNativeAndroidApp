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

  if (numValue >= 1e12) {
    return `${formatNumber(numValue / 1e12)} T`;
  } else if (numValue >= 1e9) {
    return `${formatNumber(numValue / 1e9)} B`;
  } else if (numValue >= 1e6) {
    return `${formatNumber(numValue / 1e6)} M`;
  }
  
  return formatNumber(numValue);
};