import { useRef, useState } from 'react';
import './style.css';
import UpdateProfilePicture from './UpdateProfilePicture';
// import UpdateProfilePicture from './UpdateProfilePicture';
import useClickOutside from '../../helpers/clickOutside';
import { photosReducer } from '../../function/reducer';
import { useSelector } from 'react-redux';
export default function ProfilePicture({ username, setShow, pRef, photos }) {
  const popup = useRef(null);
  const { user } = useSelector((state) => ({ ...state }));

  // useClickOutside(popup, () => setShow(false));
  const refInput = useRef(null);
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== 'image/jpeg' &&
      file.type !== 'image/png' &&
      file.type !== 'image/webp' &&
      file.type !== 'image/gif'
    ) {
      setError(`${file.name} format is not supported.`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} is too large max 5mb allowed.`);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImage(event.target.result);
    };
  };

  return (
    <div className="blur">
      <input
        type="file"
        ref={refInput}
        hidden
        onChange={handleImage}
        accept="image/jpeg,image/png,image/webp,image/gif"
      />
      <div className="postBox pictureBox" ref={popup}>
        <div className="box_header">
          <div className="small_circle" onClick={() => setShow(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Change Picture</span>
        </div>
        <div className="update_picture_wrap">
          <div className="update_picture_buttons">
            <button
              className="light_blue_btn bheight"
              onClick={() => refInput.current.click()}
            >
              <i className="plus_icon "> </i>
              Upload Photos
            </button>
            <button className="gray_btn bheight">
              <i className="frame_icon"> </i>
              Upload Photos
            </button>
          </div>
        </div>
        {error && (
          <div className="postError comment_error">
            <div className="postError_error">{error}</div>
            <button className="blue_btn " onClick={() => setError('')}>
              Try again
            </button>
          </div>
        )}

        {/* TODO: OLD PROFILE PICTURE */}
        <div className="old_pictures_wrap scrollbar">
          <h4>Your Old Profile Picture</h4>
          <div className="old_pictures">
            {photos
              .filter(
                (img) => img.folder === `${user.username}/profile_pictures`
              )
              .map((photo) => (
                <img
                  src={photo.secure_url}
                  alt="img"
                  key={photo.public_id}
                  style={{ width: '100px' }}
                  onClick={() => setImage(photo.secure_url)}
                />
              ))}
          </div>

          {/* TODO: ALL POST PICTURES */}
          <h4>Your Old Profile Picture</h4>
          <div className="old_pictures">
            {photos
              .filter(
                (img) => img.folder !== `${user.username}/profile_pictures`
              )
              .map((photo) => (
                <img
                  src={photo.secure_url}
                  alt="img"
                  key={photo.public_id}
                  style={{ width: '100px' }}
                  // set image to the current key
                  onClick={() => setImage(photo.secure_url)}
                />
              ))}
          </div>
        </div>
      </div>

      {/* when image is pass in to usestate */}
      {image && (
        <UpdateProfilePicture
          setImage={setImage}
          image={image}
          setError={setError}
          setShow={setShow}
          pRef={pRef}
        />
      )}
    </div>
  );
}
