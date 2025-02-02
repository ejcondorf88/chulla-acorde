
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../components/home/Home";
import NotFoundPage from "../components/home/Error404";
import BarraLinks from "../components/IngresoLinks/BarraLinks";
export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/BarraLinks" element={<BarraLinks />} />
            <Route path="*" element={<NotFoundPage />} />

            </Routes>
        </BrowserRouter>)
}