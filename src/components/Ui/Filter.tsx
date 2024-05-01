import { TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { jobLocation, jobTitle } from "../../Redux/FilterApi";

export default function Filter() {
    const [jobFilter, setJobFilter] = useState<string>("")
    const [locationFilter, setLocationFilter] = useState<string>("")
    const dispatch = useDispatch();

    const filterJOBS = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setJobFilter(e.currentTarget.value);
        dispatch(jobTitle(e.currentTarget.value))
    }
    const filterLocation = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLocationFilter(e.currentTarget.value);
        dispatch(jobLocation(e.currentTarget.value))
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-4 py-4 gap-4">
            <div className="cols-1">
                <TextField id="outlined-basic" label="Location" variant="outlined" onChange={(e) => filterLocation(e)} value={locationFilter} />
            </div>
            <div className="cols-1">
                <TextField id="outlined-basic" label="Job Title" variant="outlined" onChange={(e) => filterJOBS(e)} value={jobFilter} />
            </div>

        </div>
    )
}
