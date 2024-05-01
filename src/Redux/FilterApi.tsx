import { createSlice } from '@reduxjs/toolkit';


export interface FilterState {
    titleFilter: string
    locationFilter: string
}

const initialState: FilterState = {
    titleFilter: "",
    locationFilter: ""
}

const filterApiSlice = createSlice({
    name: 'filterApi',
    initialState,
    reducers: {
        jobTitle: (state, action) => {
            state.titleFilter = action.payload;
            // console.log(action.payload, "action.payload", state.titleFilter)
        },
        jobLocation: (state, action) => {
            state.locationFilter = action.payload;
            console.log(action.payload, "action.payload", state.locationFilter)
        },
    }
});
export const { jobTitle, jobLocation } = filterApiSlice.actions;
export default filterApiSlice.reducer;