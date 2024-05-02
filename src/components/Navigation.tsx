import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { RootState } from '../Redux/Store'

export default function NavigationRoute() {
    const TotalJob = useSelector((state: RootState) => state.filterApi.totalJob)
    return (
        <ul className="flex justify-center space-x-4 text-lg">
            <li>
                <NavLink to="/applied" className={({ isActive }) => (isActive ? 'text-[red] border-b-4 border-[red]' : 'text-[#1976d2] hover:text-[#404040] hover:border-[#f5f5f5]')}>Applied Job</NavLink>
            </li>
            <li>
                <NavLink to="/" className={({ isActive }) => (isActive ? 'text-[red] border-b-4 border-[red]' : 'text-[#1976d2] hover:text-[#404040] hover:border-[#f5f5f5]')}>Search Jobs
                    <Typography variant="subtitle2" component="sup" className="text-red-500">{TotalJob}</Typography>
                </NavLink>
            </li>
        </ul>
    )
}
