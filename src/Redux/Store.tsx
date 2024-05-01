
import {configureStore } from '@reduxjs/toolkit';
import filterApiSlice from "./FilterApi"





export const store = configureStore({
    reducer: {
        filterApi: filterApiSlice
    },
});

export type RootState = ReturnType<typeof store.getState>