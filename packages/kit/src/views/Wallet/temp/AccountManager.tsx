import { BigNumber } from './BigNumber';
import engine from './EngineProvider';
import { AssetToken, WalletAsset } from './WalletAsset';

export async function loadAssets(accountId: string, networkId: string) {
  const account = await engine.getAccount(accountId, networkId);
  const assetsToken: WalletAsset[] = [];
  const tokens = Array<string>(account.tokens.length);

  const network = await engine.getNetwork(networkId);

  assetsToken.push({
    id: 'main',
    chainId: network.id,
    address: account.address,
    name: account.name,
    symbol: network.symbol,
    decimals: network.decimals,
    logoURI: network.logoURI,
    coinType: account.coinType,
    amount: '0',
    fiatAmount: '0',
    fiatUnit: 'USD',
    showDecimals: 6,
  });

  account.tokens.forEach((token) => {
    tokens.push(token.tokenIdOnNetwork);
    assetsToken.push({
      id: token.id,
      chainId: token.networkId,
      address: token.tokenIdOnNetwork,
      name: token.name,
      symbol: token.symbol,
      decimals: token.decimals,
      logoURI: token.logoURI,
      amount: '0',
      fiatAmount: '0',
      fiatUnit: 'USD',
      showDecimals: 6,
    });
  });

  return assetsToken;
}

export const loadAssetsAmount = async (
  accountId: string,
  networkId: string,
  assets: AssetToken[],
) => {
  const tokens = Array<string>(assets.length);
  assets.forEach((token, index) => {
    if (index === 0) return;
    tokens.push(token.address);
  });

  const assertAmount = await engine.getAccountBalance(
    accountId,
    networkId,
    tokens,
  );

  assets?.map((element, index) => {
    let amount = new BigNumber(0);
    if (index === 0) {
      amount = assertAmount.main ?? new BigNumber(0);
    } else {
      amount = assertAmount[element.address] ?? new BigNumber(0);
    }
    element.amount = amount
      .dp(element.showDecimals, BigNumber.ROUND_HALF_UP)
      .toString();
    return element;
  });
};

export const loadAssetsFiatAmount = (
  networkId: string,
  assets: AssetToken[],
) => {
  const tokens = Array<string>(assets.length);
  assets.forEach((token, index) => {
    if (index === 0) return;
    tokens.push(token.address);
  });

  try {
    const assertAmount = engine.getPrices(networkId, tokens);
    assets?.map((element, index) => {
      let amount = new BigNumber(0);
      if (index === 0) {
        amount = assertAmount.get('main') ?? new BigNumber(0);
      } else {
        amount = assertAmount.get(element.address) ?? new BigNumber(0);
      }
      element.fiatAmount = amount
        .dp(element.showDecimals, BigNumber.ROUND_HALF_UP)
        .toString();
      return element;
    });
  } catch (e) {
    console.log('');
  }
};

export const calculateTotalAmount = (assets: AssetToken[]) => {
  let totalAmount = new BigNumber(0);
  let totalFiatAmount = new BigNumber(0);

  assets.forEach((element) => {
    totalFiatAmount = totalFiatAmount.plus(new BigNumber(element.fiatAmount));
  });

  totalAmount = totalFiatAmount.div(new BigNumber(assets[0].fiatAmount ?? '0'));

  return {
    totalAmount,
    totalFiat: totalFiatAmount,
  };
};
