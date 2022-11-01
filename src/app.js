import Navbar from "./Navbar"
import Home from "./pages/Home"
import { Route, Routes } from "react-router-dom"
import { AuthProvider } from "./auth"
import Login from "./pages/Login"
import Register from "./pages/Register"
import PrivateRoutes from "./PrivateRoutes"
import Cities from "./pages/Cities"
import { QueryClientProvider, QueryClient } from "react-query"

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Navbar />
                <div className="container">
                    <Routes>
                        <Route element={<PrivateRoutes />}>
                            <Route path="/cities" element={<Cities />} />
                        </Route>
                        <Route path="/weather_app" element={<Home />} />
                        <Route path="/about" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </div>
            </AuthProvider>
        </QueryClientProvider>
    )
}

export default App