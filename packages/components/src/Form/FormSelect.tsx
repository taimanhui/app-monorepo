import React, { FC, ComponentProps } from 'react';
import Select from '../Select';

type FormSelectProps = ComponentProps<typeof Select>;

export const FormSelect: FC<FormSelectProps> = (props) => {
  return <Select {...props}></Select>;
};
