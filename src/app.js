import Navbar from "./Navbar"
import Home from "./pages/Home"
import { Route, Routes } from "react-router-dom"
import { AuthProvider } from "./auth"
import Login from "./pages/Login"
import Register from "./pages/Register"
import PrivateRoutes from "./PrivateRoutes"
import Cities from "./pages/Cities"
import { QueryClientProvider, QueryClient } from "react-query"
import About from "./pages/About"
import image from "../public/background2.webp"; 

const queryClient = new QueryClient()

function App() {


    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Navbar />
                <main className="container" style={{
                    padding: 0, margin: 0, backgroundImage: `url(${image})`, backgroundRepeat: "no-repeat", height: '100vh'
                }} >
                    <Routes>
                        <Route element={<PrivateRoutes />}>
                            <Route path="/cities" element={<Cities />} />
                        </Route>
                        <Route path="/weather_app" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </main>
            </AuthProvider>
        </QueryClientProvider>
    )
}

export default App