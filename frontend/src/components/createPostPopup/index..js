import './style.css';
export default function CreatePostPopup({ user }) {
  return (
    <div className="blur">
      <div className="postBox">
        <div className="box_header">
          <div className="small_circle">
            <i className="exit_icon"></i>
          </div>
          <span>Create post</span>
        </div>
        <div className="box_profile">
          <img src={user.picture} alt="" className="box_profile_img" />
          <div className="box-col">
            {/* name section  */}
            <div className="box_profile_name">
              {user.first_name} {user.last_name}
            </div>
            {/* private or public */}
            <div className="box_privacy">
              <img src="../../../icons/public.png" alt="" />
              <span>Public</span>
              <i className="arrowDown_icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
