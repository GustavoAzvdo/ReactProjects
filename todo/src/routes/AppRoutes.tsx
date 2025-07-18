import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login/Login'
import SignIn from '../pages/SignIn/SignIn'
import Home from '../pages/Home/Home'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path='/home' element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes