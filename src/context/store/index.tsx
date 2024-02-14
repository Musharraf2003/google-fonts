import { configureStore } from "@reduxjs/toolkit";
import optionReducer from "../features/optionSlice";
import bagReducer from "../features/bagSlice";
import toggleReducer from "../features/toggleSlice";
import toggleBagReducer from "../features/toggleBagSlice";
import textReducer from '../features/textSlice';
import fontSizeReducer from "../features/fontSizeSlice";
import fontStylesReducer from "../features/fontStylesSlice";

const store = configureStore({
    reducer: {
       option: optionReducer,
       bag: bagReducer,
       sidebar: toggleReducer,
       toggleBag: toggleBagReducer,
       text: textReducer,
       fontSize: fontSizeReducer,
       fontStyles: fontStylesReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store }