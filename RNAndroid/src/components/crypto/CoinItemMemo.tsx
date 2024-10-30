import React, { memo } from 'react';
import { CoinItem } from './CoinItem';
import { CryptoAsset } from '@/types/crypto';

interface CoinItemMemoProps {
  asset: CryptoAsset;
}

export const CoinItemMemo = memo(
  ({ asset }: CoinItemMemoProps) => <CoinItem asset={asset} />,
  (prevProps, nextProps) => {
    return (
      prevProps.asset.uniqueId === nextProps.asset.uniqueId &&
      prevProps.asset.quotes.USD.price === nextProps.asset.quotes.USD.price &&
      prevProps.asset.quotes.USD.percent_change_24h === nextProps.asset.quotes.USD.percent_change_24h
    );
  }
);

CoinItemMemo.displayName = 'CoinItemMemo';