import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { profileReducer } from '../../function/reducer';
import Header from '../../components/header/index';
import './style.css';
import  CreatePost from '../../components/createPost';
import Cover from './Cover.js';
import ProfilePictureInfos from './ProfilePictureInfos';
import ProfileMenu from './ProfileMenu';
import PplYouMayKnow from './PplYouMayKnow';
import GridPosts from './GridPosts';
export default function Profile({setPopupVisible}) {
  const { username } = useParams();
  const navigate = useNavigate();
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
  // console.log(profile);
  return (
    <div className="profile">
      <Header page="profile" />
      <div className="profile_top">
        <div className="profile_container">
          <Cover cover={profile.cover} />
          <ProfilePictureInfos profile={profile} />
          <ProfileMenu />
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          {/* add people section  */}
          <div className="bottom_conttainer">
            <PplYouMayKnow />

            {/*profile info section  */}
            <div className="profile_grid">
              <div className="profile_left"></div>
              <div className="profile_right">
                <CreatePost
                  user={user}
                  profile={profile}
                  setPopupVisible={setPopupVisible}
                />
                <GridPosts />
              </div>  
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
