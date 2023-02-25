import React from 'react';
import './App.module.css';
import { Route, Routes } from 'react-router-dom';
import { PublicRouter } from "../../utils/routes";
import { Main } from "../Main";


const App: React.FC = () => (
    <Routes>
        <Route path={PublicRouter.MAIN} element={<Main/>}/>
    </Routes>
);

export default App;
