import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Profile from './pages/profile';
import Home from './pages/home';
import Activate from './pages/home/activate';
import Reset from './pages/reset';
import CreatePostPopup from './components/createPostPopup/index.';
import { useDispatch, useSelector } from 'react-redux';
import NotLoggedInRoutes from './routes/NotLoggedInRoutes';
import LoggedInRoutes from './routes/LoggedInRoutes';
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { postsReducer } from './function/reducer';

// function reducer(state, action) {
//   switch (action.type) {
//     case 'POSTS_REQUEST':
//       return { ...state, loading: true, error: '' };
//     case 'POSTS_SUCCESS':
//       return {
//         ...state,
//         loading: false,
//         posts: action.payload,
//         error: '',
//       };
//     case 'POSTS_ERROR':
//       return { ...state, loading: false, error: action.payload };

//     default:
//       return state;
//   }
// }

function App() {
  const { user } = useSelector((state) => ({ ...state }));
  const [{ loading, error, posts }, dispatch] = useReducer(postsReducer, {
    loading: false,
    error: '',
    posts: [],
  });
  // everytime when page refresh fetch data from backend
  useEffect(() => {
    getAllPosts();
  }, []);
  // fetch all post function
  const getAllPosts = async () => {
    try {
      dispatch({
        type: 'POSTS_REQUEST',
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllposts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({
        type: 'POSTS_SUCCESS',
        // data that fetch from backend
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'POSTS_ERROR',
        payload: error.response.data.message,
      });
    }
  };
  console.log(posts);
  const [popupVisible, setPopupVisible] = useState(false);
  return (
    <div>
      <div>
        {/* when user and popup is true*/}
        {user && popupVisible && (
          <CreatePostPopup
            user={user}
            setPopupVisible={setPopupVisible}
            dispatch={dispatch}
            posts={posts}
          />
        )}
        <Routes>
          <Route element={<LoggedInRoutes />}>
            <Route
              path="/profile"
              element={
                <Profile
                  setPopupVisible={setPopupVisible}
                  getAllPosts={getAllPosts}
                />
              }
              exact
            />
            {/* when entered with id we compare to BackE to check if user exists */}
            <Route
              path="/profile/:username"
              element={<Profile setPopupVisible={setPopupVisible} />}
              exact
            />
            <Route
              path="/"
              element={
                <Home
                  setPopupVisible={setPopupVisible}
                  posts={posts}
                  loading={loading}
                />
              }
              exact
            />
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
