import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";

import BlogDetails from "./pages/BlogDetails";

import EditBlog from "./pages/EditBlog";

import { Toaster } from "react-hot-toast";

import Landing from "./pages/Landing";

import Login from "./pages/Login";

import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>

      <div className="bg-black text-white min-h-screen flex flex-col">
        <Toaster
          position="top-right"
        />

        <Routes>



          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Landing />
              </>
            }
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/blogs"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateBlog />
              </ProtectedRoute>
            }
          />

          <Route
            path="/blog/:id"
            element={<BlogDetails />}
          />

          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditBlog />
              </ProtectedRoute>
            }
          />

        </Routes>



      </div>

    </BrowserRouter>
  );
}

export default App;