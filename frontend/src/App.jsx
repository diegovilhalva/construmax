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
import Dashboard from "./pages/Dashboard"
import RequireAuth from "./components/RequireAuth"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import BlogPostPage from "./pages/BlogPostPage"
import ScrollToTop from "./components/ScrollToTop"

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ToastContainer />
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
        <Route path="/blog/:slug" element={
          <MainLayout>
            <BlogPostPage />
          </MainLayout>
        } />
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
        <Route path="/admin/dashboard"
          element={
            <RequireAuth>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </RequireAuth>
          } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
