import {useState} from 'react'
import './App.css'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Header from "./components/Header.tsx";
import Form from "./pages/Form.tsx";
import Customer from "./pages/Customer.tsx";
import {PATHS} from "./constants/routes.ts";

function App() {
    const [id, setId] = useState<number>(0);

    return (
        <BrowserRouter>
            <Header id={id}/>
            <Routes>
                <Route path={PATHS.HOME} element={<Navigate to={PATHS.CUSTOMERS}/>}/>
                <Route path={PATHS.CUSTOMERS} element={<Customer setId={setId}/>}/>
                <Route path={PATHS.CREATE_CUSTOMER} element={<Form setId={setId}/>}/>
                <Route path={`${PATHS.CUSTOMERS}/:id`} element={<Form setId={setId}/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
