import { createSlice } from '@reduxjs/toolkit';


export interface FilterState {
    titleFilter: string
    locationFilter: string
    locationExperience: null
    jobWork:string
    Cname:string
}

const initialState: FilterState = {
    titleFilter: "",
    locationFilter: "",
    locationExperience: null,
    jobWork: "",
    Cname:""
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
            // console.log(action.payload, "action.payload", state.locationFilter)
        },
        jobExperience: (state, action) => {
            state.locationExperience = action.payload;
            // console.log(action.payload, "action.payload", state.locationFilter)
        },
        jobWork: (state, action) => {
            state.jobWork = action.payload;
            console.log(action.payload, "action.payload", state.locationFilter)
        },
        CompanyName: (state, action) => {
            state.Cname = action.payload;
            console.log(action.payload, "action.payload", state.locationFilter)
        },
    }
});
export const { jobTitle, jobLocation, jobExperience, jobWork, CompanyName } = filterApiSlice.actions;
export default filterApiSlice.reducer;