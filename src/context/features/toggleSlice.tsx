import { createSlice } from "@reduxjs/toolkit"; 

interface SidebarState {
    isOpen: boolean;
}

const initialState: SidebarState = {
    isOpen: false
}

const toggleSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isOpen = !state.isOpen;
        }
    }
})

export const { toggleSidebar } = toggleSlice.actions;
export default toggleSlice.reducer;