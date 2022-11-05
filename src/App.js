import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useAuthContext } from "./hooks/useAuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Navigationbar from "./components/Navigationbar";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navigationbar> </Navigationbar>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login"></Navigate>}
            ></Route>
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/"></Navigate>}
            ></Route>
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/"></Navigate>}
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
