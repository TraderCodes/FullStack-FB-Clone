import axios from 'axios';
import { useEffect, useReducer,useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { profileReducer } from '../../function/reducer';
import Header from '../../components/header/index';
import './style.css';
import  CreatePost from '../../components/createPost';
import Cover from './Cover.js';
import ProfilePictureInfos from './ProfilePictureInfos';
import ProfileMenu from './ProfileMenu';
import PplYouMayKnow from './PplYouMayKnow';
import GridPosts from './GridPosts';
import Post from '../../components/post';
import Photos from './Photos';
import Friends from './Friends';

export default function Profile({setPopupVisible}) {
  const { username } = useParams();
  const [photos, setPhotos] = useState({});

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
// check if user is a visitor

var visitor = userName === user.username ?false :true;
// console.log("🚀 ~ visitor", visitor)

  const path = `${userName}/*`;
  const max = 30;
  const sort = 'desc';
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
        

  
        try {
          const images = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/listImages`,
            { path, sort, max },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setPhotos(images.data);
        } catch (error) {
          console.log(error);
        }
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
          <Cover
            cover={profile.cover}
            visitor={visitor}
            photos={photos.resources}
          />
          <ProfilePictureInfos
            profile={profile}
            visitor={visitor}
            photos={photos.resources}
          />
          <ProfileMenu />
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          {/* add people section  */}
          <div className="bottom_container">
            <PplYouMayKnow />
            {/*profile info section  */}
            <div className="profile_grid">
              <div className="profile_left">
                <Photos
                  username={userName}
                  token={user.token}
                  photos={photos}
                />
                <Friends
                  username={userName}
                  freinds={profile.freinds}
                  photos={photos}
                  token={user.token}
                />
                <div className="relative_fb_copyright">
                  <Link to="/">
                    Hey Visitors !
                    {/* <img src="../../images/github.svg"></img> */}
                    <br />
                  </Link>
                  <Link to="/"></Link>This is Made by
                  <br /> <Link to="/"> Jamal Sheriff </Link>
                  <br />
                  Project to Challenge myself 2022 ©
                </div>
              </div>
              <div className="profile_right">
                {!visitor && (
                  <CreatePost
                    user={user}
                    profile={profile}
                    setPopupVisible={setPopupVisible}
                  />
                )}
                <GridPosts />
                <div className="posts">
                  {/* only return perosna; profile post  */}
                  {profile.posts && profile.posts.length ? (
                    profile.posts.map((post) => (
                      <Post post={post} user={user} key={post._id} profile />
                    ))
                  ) : (
                    <div className="no_posts">No posts available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
