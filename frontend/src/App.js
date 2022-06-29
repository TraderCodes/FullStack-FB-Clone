import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Profile from './pages/profile';
import Home from './pages/home';
import Activate from './pages/home/activate';
import Reset from './pages/reset';
import CreatePostPopup from './components/createPostPopup/index.';
import {useSelector} from 'react-redux'
import NotLoggedInRoutes from './routes/NotLoggedInRoutes';
import LoggedInRoutes from './routes/LoggedInRoutes';
function App() {
  const {user} = useSelector((state) => ({ ...state }))
  return (
    <div>
      <div>
       {user && <CreatePostPopup user={user} />}
        <Routes>
          <Route element={<LoggedInRoutes />}>
            <Route path="/profile" element={<Profile />} exact />
            <Route path="/" element={<Home />} exact />
            <Route path="/activate/:token" element={<Activate />} exact />
          </Route>
          <Route element={<NotLoggedInRoutes />}>
            <Route path="/login" element={<Login />} exact />
          </Route>
          <Route path="/reset" element={<Reset />} />
        </Routes>
      </div>
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
