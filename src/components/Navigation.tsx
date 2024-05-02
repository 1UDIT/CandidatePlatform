import { Link } from 'react-router-dom'

export default function NavigationRoute() {
    return (
        <ul className="flex justify-center space-x-4 border-2 rounded-lg border-[#f5f5f5]">
            <li>
                <Link to="/applied" className="text-[#1976d2] hover:text-[#404040] ">Applied</Link>
            </li>
            <li>
                <Link to="/" className="text-[#1976d2] hover:text-[#404040]">Not Applied</Link>
            </li>
        </ul>
    )
}
