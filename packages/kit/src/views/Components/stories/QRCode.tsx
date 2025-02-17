import React from 'react';

import { Center, QRCode } from '@onekeyhq/components';

const QRCodeGallery = () => (
  <Center flex="1" bg="background-hovered">
    <QRCode value="https://onekey.so/" size={200} />
  </Center>
);

export default QRCodeGallery;
