import { createSlice, PayloadAction } from "@reduxjs/toolkit"; 
import { FontStyle, FontWeight } from "../../types";

interface CartState {
    items: (FontStyle | FontWeight)[]
}

const initialState: CartState = {
    items: JSON.parse(localStorage.getItem('bag') as string) || []
}

const bagSlice = createSlice({
    name: 'bag',
    initialState,
    reducers: {
        addToBag: (state, action: PayloadAction<FontStyle | FontWeight | any>) => {
            const newItem: any = action.payload;
            const isDuplicate = state.items.some((item: any) => (
                item.fontWeight === newItem.fontWeight && item.fontStyle === newItem.fontStyle
            ));
            if (!isDuplicate) {
                state.items = [...state.items, newItem];
                localStorage.setItem('bag', JSON.stringify(state.items));
            }
        },
        removeFromBag: (state, action: PayloadAction<FontStyle | FontWeight>) => {
            const itemToRemove: any = action.payload;
            state.items = state.items.filter((item: any) => (
                item.fontWeight !== itemToRemove.fontWeight || item.fontStyle !== itemToRemove.fontStyle
            ));
            localStorage.setItem('bag', JSON.stringify(state.items));
        },
        clearBag: (state) => {
            state.items = [];
        }
    }
})

export const { addToBag, removeFromBag, clearBag } = bagSlice.actions;
export default bagSlice.reducer;