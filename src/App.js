import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Layout from './components/Layout';
import RequireAuth from "./components/RequiredAuth";

function App() {
  return (

    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<Register />} />

        <Route path="login" element={<Login />} />

        {/* protected route for logged users */}
        <Route element={<RequireAuth />}>
        <Route path="profile" element={<Profile />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
