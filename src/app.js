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
import background from "../public/background.webp"

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Navbar />
                <main className="container" style={{ padding: 0, margin: 0, backgroundImage: `url(${background})`, height: "auto", minHeight: "100vh" }} >
                    <Routes>
                        <Route element={<PrivateRoutes />}>
                            <Route path="/weather_app/cities" element={<Cities />} />
                        </Route>
                        <Route path="/weather_app" element={<Home />} />
                        <Route path="/weather_app/about" element={<About />} />
                        <Route path="/weather_app/login" element={<Login />} />
                        <Route path="/weather_app/register" element={<Register />} />
                    </Routes>
                </main>
            </AuthProvider>
        </QueryClientProvider>
    )
}

export default App