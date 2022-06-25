import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Profile from './pages/profile';
import Home from './pages/home';
import Activate from './pages/home/activate';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/profile" element={<Profile />} exact />
        <Route path="/activate/:token" element={<Activate />} exact />
      </Routes>
    </div>
  );
}

export default App;

// install react dom
// npm i reducx react - redux
// add login css
// add formik and yup validation
// npm i react=responsive
// npm i js-cookie
// npm i axios
// npm i react-spinners
