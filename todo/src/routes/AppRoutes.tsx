import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login/Login'
import SignIn from '../pages/SignIn/SignIn'
import Home from '../pages/Home/Home'
import RecuperarSenha from '../pages/RecuperarSenha/RecuperarSenha'
import Codigo from '../pages/Codigo/Codigo'
import NovaSenha from '../pages/NovaSenha/NovaSenha'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/recuperar-senha' element={<RecuperarSenha/>}/>
                    <Route path='/codigo' element={<Codigo/>}/>
                    <Route path='/nova-senha' element={<NovaSenha/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes