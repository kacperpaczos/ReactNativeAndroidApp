export const cryptoCategoryMap: Record<string, 'stablecoin' | 'defi' | 'smart-contract' | 'layer1' | 'other'> = {
    // Stablecoiny
    'usdt-tether': 'stablecoin',
    'usdc-usd-coin': 'stablecoin',
    'busd-binance-usd': 'stablecoin',
    'dai-dai': 'stablecoin',
    'tusd-trueusd': 'stablecoin',
  
    // DeFi
    'uni-uniswap': 'defi',
    'link-chainlink': 'defi',
    'aave-aave': 'defi',
    'cake-pancakeswap': 'defi',
    'comp-compound': 'defi',
  
    // Smart Contract Platforms
    'eth-ethereum': 'smart-contract',
    'bnb-binance-coin': 'smart-contract',
    'sol-solana': 'smart-contract',
    'ada-cardano': 'smart-contract',
    'dot-polkadot': 'smart-contract',
  
    // Layer 1
    'btc-bitcoin': 'layer1',
    'ltc-litecoin': 'layer1',
    'xmr-monero': 'layer1',
    'bch-bitcoin-cash': 'layer1',
    'etc-ethereum-classic': 'layer1'
  };
  
  export const getAssetCategory = (assetId: string): 'stablecoin' | 'defi' | 'smart-contract' | 'layer1' | 'other' => {
    return cryptoCategoryMap[assetId] || 'other';
  };