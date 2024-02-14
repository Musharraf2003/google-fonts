import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface FontSizeState {
    value: number
}

const initialState: FontSizeState = {
    value: 50
}

const fontSizeSlice = createSlice({
    name: 'fontSize',
    initialState,
    reducers: {
        setFontSize: (state, action: PayloadAction<number>) => {
            state.value = action.payload
        }
    }
})

export const { setFontSize } = fontSizeSlice.actions;
export default fontSizeSlice.reducer;