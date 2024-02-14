import { createSlice } from "@reduxjs/toolkit";

interface BagState {
    bagOpen: boolean;
}

const initialState: BagState = {
    bagOpen: false
}

const toggleBagSlice = createSlice({
    name: 'toggleBag',
    initialState,
    reducers: {
        toggleBag: (state) => {
            state.bagOpen = !state.bagOpen;
            console.log(state.bagOpen)
        }
    }
})

export const { toggleBag } = toggleBagSlice.actions;
export default toggleBagSlice.reducer;