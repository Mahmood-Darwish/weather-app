import Navbar from "./Navbar"
import Home from "./pages/Home"
import { Route, Routes } from "react-router-dom"
import { AuthProvider } from "./auth"
import Login from "./pages/Login"

function App() {
    return (
        <AuthProvider>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/weather_app" element={<Home />} />
                    <Route path="/pricing" element={<Home />} />
                    <Route path="/about" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </AuthProvider>
    )
}

export default App