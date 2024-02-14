import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TextState {
    value: string
}

const initialState: TextState = {
    value: ""
}

const textSlice = createSlice({
    name: 'text',
    initialState,
    reducers: {
        setTextValue: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        }
    }
})

export const { setTextValue } = textSlice.actions;
export default textSlice.reducer;