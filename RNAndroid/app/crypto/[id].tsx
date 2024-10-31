import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { CryptoDetails } from '@/components/crypto/CryptoDetails';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { useCryptoDetails } from '@/hooks/useCryptoDetails';

export default function CryptoDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { asset, loading, error } = useCryptoDetails(id as string);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !asset) {
    return <ErrorMessage message={error || 'Nie znaleziono szczegółów kryptowaluty'} />;
  }

  return <CryptoDetails asset={asset} />;
}