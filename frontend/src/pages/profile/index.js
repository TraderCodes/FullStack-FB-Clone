import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { profileReducer } from '../../function/reducer';
export default function Profile() {
  const { username } = useParams();
  const { user } = useSelector((state) => ({ ...state }));
  // if username not in the link we send user to current user logged in
  var userName = username === undefined ? user.username : username;
  const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
    loading: false,
    error: '',
    profile: {},
  });

  // Call useEffect when name change
  useEffect(() => {
    getProfile();
  }, [userName]);

  const getProfile = async (name) => {
    try {
      dispatch({
        type: 'PROFILE_REQUEST',
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getProfile/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({
        type: 'PROFILE_SUCCESS',
        // data that fetch from backend
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'PROFILE_ERROR',
        payload: error.response.data.message,
      });
    }
  };
  console.log(profile);
  return <div>Profile</div>;
}
