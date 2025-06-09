import { BrowserRouter, Routes, Route } from "react-router"
import Home from "./pages/Home"
import About from "./pages/About"
import Services from "./pages/Services"
import Projects from "./pages/Projects"
import Blog from "./pages/Blog"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import MainLayout from "./layouts/MainLayout"
import AdminLayout from "./layouts/AdminLayout"

function App() {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        />
        <Route
          path="/services"
          element={
            <MainLayout>
              <Services />
            </MainLayout>
          }
        />
        <Route
          path="/projects"
          element={
            <MainLayout>
              <Projects />
            </MainLayout>
          }
        />
        <Route
          path="/blog"
          element={
            <MainLayout>
              <Blog />
            </MainLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <MainLayout>
              <Contact />
            </MainLayout>
          }
        />

        {/* Rota sem navbar/footer */}
        <Route
          path="/admin/login"
          element={
            <AdminLayout>
              <Login />
            </AdminLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
