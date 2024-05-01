import { IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { jobExperience, jobLocation, jobTitle, jobWork } from "../../Redux/FilterApi";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ClearIcon from '@mui/icons-material/Clear';

export default function Filter() {
    const [jobFilter, setJobFilter] = useState<string>("")
    const [locationFilter, setLocationFilter] = useState<string>("");
    const [Experience, setExperience] = useState<string>("");
    const [Work, setWork] = useState<string>("");
    const dispatch = useDispatch();

    const handleChange = (event: SelectChangeEvent) => {
        setExperience(event.target.value);
        dispatch(jobExperience(event.target.value));
    };
    const handleWork = (event: SelectChangeEvent) => {
        setWork(event.target.value);
        dispatch(jobWork(event.target.value));
    };
    const handleClearWork = () => {
        setWork('');
        dispatch(jobWork(""));
    };

    const handleClear = () => {
        console.log("s");
        setExperience("");
        dispatch(jobExperience(""));
    };


    const filterJOBS = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setJobFilter(e.currentTarget.value);
        dispatch(jobTitle(e.currentTarget.value))
    }
    const filterLocation = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLocationFilter(e.currentTarget.value);
        dispatch(jobLocation(e.currentTarget.value))
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 px-4 py-4 gap-4">
            <div className="cols-1">
                <TextField fullWidth  id="outlined-basic" label="Location" variant="outlined" onChange={(e) => filterLocation(e)} value={locationFilter} />
            </div>
            <div className="cols-1">
                <TextField fullWidth  id="outlined-basic" label="Job Title" variant="outlined" onChange={(e) => filterJOBS(e)} value={jobFilter} />
            </div>
            <div className="cols-1">
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Experience</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={Experience}
                        label="Experience"
                        onChange={handleChange}
                        endAdornment={
                            Experience && (
                                <IconButton onClick={handleClear} edge="start">
                                    <ClearIcon />
                                </IconButton>
                            )
                        }
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="cols-1">
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Remote</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={Work}
                        label="Work"
                        onChange={handleWork}
                        endAdornment={
                            Work && (
                                <IconButton onClick={handleClearWork} edge="start">
                                    <ClearIcon />
                                </IconButton>
                            )
                        }
                    >
                        <MenuItem value={"Remote"}>Remote</MenuItem>
                        <MenuItem value={"Hybrid"}>Hybrid</MenuItem>
                        <MenuItem value={"In-Office"}>In-Office</MenuItem> 
                    </Select>
                </FormControl>
            </div>

        </div>
    )
}
