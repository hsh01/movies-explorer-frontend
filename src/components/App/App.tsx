import React from 'react';
import './App.module.css';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRouter, PublicRouter } from "../../utils/routes";
import { Main } from "../../pages/Main";
import { Movies } from "../../pages/Movies";
import { MovieListType } from "../../models/movies";
import { Profile } from "../../pages/Profile";
import { Login } from "../../pages/Login";
import { Register } from "../../pages/Register";
import { NotFound } from "../../pages/NotFound";


const App: React.FC = () => (
    <Routes>
        <Route path={PublicRouter.MAIN} element={<Main />} />
        <Route path={ProtectedRouter.MOVIES} element={<Movies />} />
        <Route path={ProtectedRouter.SAVED_MOVIES} element={<Movies movieListType={MovieListType.SAVED} />} />
        <Route path={ProtectedRouter.PROFILE} element={<Profile />} />
        <Route path={PublicRouter.SIGNIN} element={<Login />} />
        <Route path={PublicRouter.SIGNUP} element={<Register />} />
        <Route path='*' element={<NotFound />} />
    </Routes>
);

export default App;
