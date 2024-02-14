import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FontStylesState {
  numberOfStyles: number;
}

const initialState: FontStylesState = {
  numberOfStyles: 50, 
};

const fontStylesSlice = createSlice({
  name: 'fontStyles',
  initialState,
  reducers: {
    setNumberOfStyles: (state, action: PayloadAction<number>) => {
      state.numberOfStyles = action.payload;
    },
  },
});

export const { setNumberOfStyles } = fontStylesSlice.actions;
export default fontStylesSlice.reducer;
