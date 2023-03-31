import React from 'react';
import './App.module.css';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRouter, PublicRouter } from "../../utils/routes";
import { Main } from "../../pages/Main";
import { Movies } from "../../pages/Movies";
import { Profile } from "../../pages/Profile";
import { Login } from "../../pages/Login";
import { Register } from "../../pages/Register";
import { NotFound } from "../../pages/NotFound";
import { AuthProvider } from "../../contexts/AuthContext";
import { ProtectedRoute } from "../ProtectedRoute";
import { SavedMovies } from "../../pages/SavedMovies";


const App: React.FC = () => (
    <AuthProvider>
        <Routes>
            <Route path={PublicRouter.MAIN} element={<Main />} />
            <Route path={ProtectedRouter.MOVIES}
                   element={
                       <ProtectedRoute>
                           <Movies />
                       </ProtectedRoute>
                   }
            />
            <Route path={ProtectedRouter.SAVED_MOVIES}
                   element={
                       <ProtectedRoute>
                           <SavedMovies />
                       </ProtectedRoute>
                   }
            />
            <Route path={ProtectedRouter.PROFILE}
                   element={
                       <ProtectedRoute>
                           <Profile />
                       </ProtectedRoute>
                   }
            />
            <Route path={PublicRouter.SIGNIN} element={<Login />} />
            <Route path={PublicRouter.SIGNUP} element={<Register />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    </AuthProvider>
);

export default App;
