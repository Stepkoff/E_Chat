import React, {useContext} from 'react';
import './styles/style.scss';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Routes, Route, Navigate, HashRouter} from 'react-router-dom';
import {AuthContext} from "./context/AuthContext";
const App = () => {
  const {currentUser} = useContext(AuthContext)
  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to={'/login'}/>
    }
    return children
  }
  return (
    <HashRouter>
      <Routes>
        <Route path={'/'}>
          <Route index element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>} />
          <Route path={'/login'} element={<Login/>} />
          <Route path={'/register'} element={<Register/>} />
          <Route path={'*'} element={<p>404</p>}/>
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;