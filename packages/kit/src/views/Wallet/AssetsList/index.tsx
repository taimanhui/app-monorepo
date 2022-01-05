import React, { useCallback, useState } from 'react';

import { useIntl } from 'react-intl';

import {
  Box,
  Divider,
  Icon,
  Pressable,
  ScrollableFlatList,
  ScrollableFlatListProps,
  Token,
  Typography,
  useUserDevice,
} from '@onekeyhq/components';

import useInterval from '../../../hooks/useInterval';
import { updateTotalBalance } from '../../../store/reducers/account';
import {
  calculateTotalAmount,
  loadAssets,
  loadAssetsAmount,
  loadAssetsFiatAmount,
} from '../temp/AccountManager';
import { AssetToken, WalletAsset } from '../temp/WalletAsset';
import { ScrollRoute } from '../type';

const AssetsList = ({ route }: { route: ScrollRoute }) => {
  const { size } = useUserDevice();
  const { index: tabPageIndex } = route;
  const intl = useIntl();

  const [assets, setAssets] = useState<WalletAsset[]>();

  const refreshAssets = useCallback(() => {
    const accountId =
      'watching--60--0x354245fe78bb274cb560521249ff4e79290144a5';
    const networkId = 'evm--1-1';
    loadAssets(accountId, networkId)
      .then((accountAssets) => {
        // obtain cache
        const cachePrice = new Map<string, string>();
        const cacheFiatPrice = new Map<string, string>();
        assets?.forEach((element) => {
          cachePrice.set(element.id, element.amount);
          cacheFiatPrice.set(element.id, element.fiatAmount);
        });

        accountAssets?.map((element) => {
          element.amount = cachePrice.get(element.id) ?? element.amount;
          element.fiatAmount =
            cacheFiatPrice.get(element.id) ?? element.fiatAmount;
          return element;
        });

        setAssets(accountAssets);
        return accountAssets;
      })
      .then((accountAssets) => {
        loadAssetsAmount(accountId, networkId, accountAssets);
        loadAssetsFiatAmount(networkId, accountAssets);
        console.log(
          '=== LoadAssetsAmount ===:\n',
          JSON.stringify(accountAssets),
        );
        setAssets(accountAssets);

        const totalAmount = calculateTotalAmount(accountAssets);
        updateTotalBalance({
          total: totalAmount.totalAmount.toString(),
          unit: accountAssets[0].symbol ?? '',
          fiatTotal: totalAmount.totalFiat.toString(),
        });
      });
  }, []);

  useInterval(() => {
    refreshAssets();
  }, 8000);

  const renderItem: ScrollableFlatListProps<WalletAsset>['renderItem'] = ({
    item,
    index,
  }) => (
    <Pressable.Item
      p={4}
      borderTopRadius={index === 0 ? '12px' : '0px'}
      borderRadius={index === (assets?.length ?? 0) - 1 ? '12px' : '0px'}
      onPress={() => {
        console.log('Click Token : ', item.address);
      }}
    >
      <Box w="100%" flexDirection="row" alignItems="center">
        <Token
          size={8}
          address={item.address}
          chain={item.chainId.toString()}
          src={item.logoURI}
        />
        <Box ml={3} mr={3} flexDirection="column" flex={1}>
          <Typography.Body1 fontWeight="bold" color="text-default">
            {`${item.amount} ${item.symbol}`}
          </Typography.Body1>
          <Typography.Body2 color="text-subdued">
            {`${item.fiatAmount} ${item.fiatUnit}`}
          </Typography.Body2>
        </Box>
        {['LARGE', 'XLARGE'].includes(size) && (
          <Box ml={3} mr={20} flexDirection="row" flex={1}>
            <Icon size={20} name="ActivityOutline" />
            <Typography.Body1 fontWeight="bold" ml={3} color="text-default">
              {item.fiatAmount}
            </Typography.Body1>
          </Box>
        )}
        <Icon size={20} name="ChevronRightSolid" />
      </Box>
    </Pressable.Item>
  );

  return (
    <Box flex={1} pt={4} pr={4} pl={4}>
      <ScrollableFlatList
        index={tabPageIndex}
        data={assets}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            pb={4}
          >
            <Typography.Heading>
              {intl.formatMessage({ id: 'asset__tokens' })}
            </Typography.Heading>
            <Pressable p={1.5}>
              <Icon size={20} name="AdjustmentsSolid" />
            </Pressable>
          </Box>
        )}
        ItemSeparatorComponent={Divider}
        ListFooterComponent={() => <Box h="20px" />}
        keyExtractor={(item: AssetToken, index: number) =>
          `${index}${item.id}${item.amount}${item.fiatAmount}${item.logoURI}`
        }
        extraData={size}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
};

export default AssetsList;
