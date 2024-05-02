import { Route, Routes, } from 'react-router-dom';
import Cards from './Ui/Cards';
import NotApplied from './Ui/NotApplied';

export default function RouteNavigation() {
    return (
        <Routes >
            <Route path='/applied' element={<NotApplied />} />
            <Route index path='/' element={<Cards />} />
        </Routes >
    )
}
