/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';

import { Platform } from 'expo-modules-core';
import { useIntl } from 'react-intl';

import { Box, SceneMap, TabView, useUserDevice } from '@onekeyhq/components';

import AccountInfo from './AccountInfo';
import AssetsList from './AccountList';
import Collectibles from './Collectibles';
import HistoricalRecord from './HistoricalRecords';

let Realm: any = null;
if (Platform.OS === 'android' || Platform.OS === 'ios') {
  // eslint-disable-next-line global-require
  Realm = require('realm');
}

const Wallet = () => {
  const { size } = useUserDevice();
  const intl = useIntl();

  // Define your models and their properties
  const CarSchema = {
    name: 'Car',
    properties: {
      make: 'string',
      model: 'string',
      miles: { type: 'int', default: 0 },
    },
  };
  const PersonSchema = {
    name: 'Person',
    properties: {
      name: 'string',
      birthday: 'date',
      cars: 'Car[]', // a list of Cars
      picture: 'data?', // optional property
    },
  };

  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    Realm.open({ schema: [CarSchema, PersonSchema] })
      .then((realm) => {
        console.log(realm.empty);
        // Create Realm objects and write to locaal storage
        realm.write(() => {
          const myCar = realm.create('Car', {
            make: 'Honda',
            model: 'Civic',
            miles: 1000,
          });
          myCar.miles += 20; // Update a property value
        });

        // Query Realm for all cars with a high mileage
        const cars = realm.objects('Car').filtered('miles > 1000');

        cars.forEach((element) => {
          console.log(element);
        });
        // Will return a Results object with our 1 car

        // Add another car
        realm.write(() => {
          const myCar = realm.create('Car', {
            make: 'Ford',
            model: 'Focus',
            miles: 2000,
          });
        });

        // Query results are updated in realtime
        cars.length; // => 2
        console.log(cars.length);
        // Remember to close the realm when finished.
        realm.close();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Box
      flex={1}
      alignItems="center"
      flexDirection="column"
      bg="background-default"
    >
      <Box flex={1} w="100%" flexDirection="column" maxW="1024px">
        {AccountInfo()}
        <Box mt={8} flex={1}>
          <TabView
            paddingX={16}
            autoWidth={!['SMALL'].includes(size)}
            routes={[
              {
                key: 'tokens',
                title: intl.formatMessage({ id: 'asset__tokens' }),
              },
              {
                key: 'collectibles',
                title: intl.formatMessage({ id: 'asset__collectibles' }),
              },
              {
                key: 'history',
                title: intl.formatMessage({ id: 'transaction__history' }),
              },
            ]}
            renderScene={SceneMap({
              tokens: AssetsList,
              collectibles: Collectibles,
              history: HistoricalRecord,
            })}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Wallet;
