import { Feeling, LiveVideo, Photo } from '../../svg';
import UserMenu from '../header/userMenu';
import './style.css';
export default function CreatePost({ user, setPopupVisible, profile }) {
  return (
    <div className="createPost">
      <div className="createPost_header">
        <img src={user?.picture} alt="" />
        <div className="open_post hover2" onClick={() => setPopupVisible(true)}>
          Make a post {user?.first_name} !
        </div>
      </div>
      <div className="create_splitter"></div>
      <div className="createPost_body" onClick={() => setPopupVisible(true)}>
        <div className="createPost_icon hover1">
          <LiveVideo color="#f3425f" />
          Live Video
        </div>
        <div className="createPost_icon hover1">
          <Photo color="#4bbf67" />
          Photo/Video
        </div>
        {/* when in profile page */}
        {profile ? (
          <div className="createPost_icon hover1">
            <i className="lifeEvent_icon"></i>
            Life event
          </div>
        ) : (
          <div className="createPost_icon hover1">
            <Feeling color="#f7b928" />
            Feelings
          </div>
        )}
      </div>
    </div>
  );
}
