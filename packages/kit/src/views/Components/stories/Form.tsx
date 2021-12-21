import React from 'react';

import { Button, Center, Form, useForm } from '@onekeyhq/components';

type FormValues = {
  username: string;
  email: string;
  description: string;
  agreement: boolean;
  isDev: boolean;
  options: string;
  url: string;
};

const FormGallery = () => {
  const { control, handleSubmit } = useForm<FormValues>();
  const onSubmit = handleSubmit((data) => console.log(data));
  return (
    <Center flex="1" background="background-hovered">
      <Form>
        <Form.Item
          label="Username"
          control={control}
          name="username"
          defaultValue=""
          rules={{
            required: 'Username cannot be empty',
            maxLength: { value: 10, message: 'The maximum length is 10.' },
          }}
        >
          <Form.Input placeholder="placeholder" />
        </Form.Item>
        <Form.Item
          label="Email"
          control={control}
          name="email"
          rules={{
            required: 'Email cannot be empty',
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: 'Email address format error',
            },
          }}
          defaultValue=""
        >
          <Form.Input placeholder="placeholder" />
        </Form.Item>
        <Form.Item
          label="Description"
          control={control}
          name="description"
          rules={{ required: 'description cannot be empty' }}
          defaultValue=""
        >
          <Form.Textarea placeholder="textarea" />
        </Form.Item>
        <Form.Item
          name="url"
          control={control}
          label="rpcUrl"
          defaultValue="https://rpc.onekey.so/eth"
        >
          <Form.Select
            containerProps={{
              width: '280px',
              zIndex: 99999,
            }}
            options={[
              {
                label: 'https://google.com',
                value: 'https://google.com',
              },
              {
                label: 'https://rpc.onekey.so/eth',
                value: 'https://rpc.onekey.so/eth',
              },
              {
                label: 'https://baidu.com',
                value: 'https://baidu.com',
              },
            ]}
          ></Form.Select>
        </Form.Item>
        <Form.Item
          label=""
          control={control}
          name="agreement"
          rules={{ required: 'agreement cannot be empty' }}
          defaultValue={false}
        >
          <Form.CheckBox title="xxx xxx xxx" />
        </Form.Item>
        <Form.Item
          control={control}
          name="isDev"
          rules={{ required: 'isDev cannot be empty' }}
          defaultValue={false}
        >
          <Form.Switch labelType="after" label="is Dev Mode" />
        </Form.Item>
        <Form.Item
          label="options"
          control={control}
          name="options"
          defaultValue="A"
        >
          <Form.RadioGroup name="options">
            <Form.Radio value="A" title="A" />
            <Form.Radio value="B" title="B" />
            <Form.Radio value="C" title="C" />
          </Form.RadioGroup>
        </Form.Item>
        <Form.Item
          name="url"
          control={control}
          label="rpcUrl"
          defaultValue="https://rpc.onekey.so/eth"
        >
          <Form.Select
            containerProps={{
              width: '280px',
              zIndex: 999,
            }}
            options={[
              {
                label: 'https://google.com',
                value: 'https://google.com',
              },
              {
                label: 'https://rpc.onekey.so/eth',
                value: 'https://rpc.onekey.so/eth',
              },
              {
                label: 'https://baidu.com',
                value: 'https://baidu.com',
              },
            ]}
          ></Form.Select>
        </Form.Item>
        <Button mt="2" onPress={onSubmit}>
          Submit
        </Button>
      </Form>
    </Center>
  );
};

export default FormGallery;
