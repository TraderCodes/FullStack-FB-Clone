import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { profileReducer } from '../../function/reducer';
import Header from '../../components/header/index';
import './style.css';
import { useState } from 'react';
export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [showCoverMenu, setShowCoverMenu] = useState(true);
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
      if (data.error === true) {
        navigate('/profile');
      } else {
        dispatch({
          type: 'PROFILE_SUCCESS',
          // data that fetch from backend
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: 'PROFILE_ERROR',
        payload: error.response.data.message,
      });
    }
  };
  console.log(profile);
  return (
    <div className="profile">
      <Header page="profile" />

      <div className="profile_top">
        <div className="profile_container">
          <div className="profile_cover">
            {profile.cover && (
              <img src={profile.cover} className="cover" alt="" />
            )}
            <div className="update_cover_wrapper">
              
              <div
                className="open_cover_update"
                onClick={() => setShowCoverMenu((prev) => !prev)}
              >
                <i className="camera_filled_icon"></i>
                Add Cover Photo
              </div>
              {showCoverMenu && (
                <div className="open_cover_menu">
                  <div className="open_cover_menu_item hover1">
                    <i className="photo_icon"></i>
                    Select Photo
                  </div>
                  <div className="open_cover_menu_item hover1">
                    <i className="upload_icon "></i>
                    Upload Photo
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
