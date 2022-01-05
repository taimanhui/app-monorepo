export interface IAssetBase {
  id: string;
  chainId: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  amount: string;
  fiatAmount: string;
  fiatUnit: string;
  showDecimals: number;
}

export interface AssetChain extends IAssetBase {
  coinType: string;
  address: string;
  name: string;
}

export interface AssetToken extends IAssetBase {
  address: string;
  name: string;
}

export type WalletAsset = AssetChain | AssetToken;
