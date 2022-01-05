import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// TODO: strong type definition
type Account = {
  address: string;
  label: string;
  // temp demo
  totalBalance: TotalBalance;
};

export type TotalBalance = {
  total: string;
  unit: string;
  fiatTotal: string;
};

type InitialState = {
  address: Account['address'];
  label: Account['address'];
  totalBalance: Account['totalBalance'];
};

const initialState: InitialState = {
  address: '0x76f3f64cb3cd19debee51436df630a342b736c24',
  label: 'Wallet',
  totalBalance: { total: '0', unit: 'ETH', fiatTotal: '0' },
};

export const accountSlicer = createSlice({
  name: 'account',
  initialState,
  reducers: {
    updateTotalBalance: (state, action: PayloadAction<TotalBalance>) => {
      state.totalBalance = action.payload;
    },
  },
});

export const { updateTotalBalance } = accountSlicer.actions;

export default accountSlicer.reducer;
