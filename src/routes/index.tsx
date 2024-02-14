import { Route, Routes } from "react-router-dom"
import SinglePage from "./single-page"
import Home from "./home"


const RouteController = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path='/single-page/:family' element={<SinglePage/>} />
            </Routes>
        </div>
      )
}

export default RouteController