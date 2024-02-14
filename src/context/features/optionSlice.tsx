import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OptionState {
    selectedOption: string
}

const initialState: OptionState = {
    selectedOption: ""
}

const optionSlice = createSlice({
    name: 'option',
    initialState,
    reducers: {
      setSelectedOption: (state, action: PayloadAction<string>) => {
        state.selectedOption = action.payload
      },
    },
  });

export const { setSelectedOption } = optionSlice.actions;
export default optionSlice.reducer;