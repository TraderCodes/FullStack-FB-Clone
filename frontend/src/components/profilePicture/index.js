import { useRef, useState } from 'react';
import './style.css';

export default function ProfilePicture() {
  const [image,setImage] = useState('') 
  const refInput = useRef(null);
  const [error,setError] = useState('');
  const handleImage = () => {
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
  };
  


  return (
    <div className="blur ">
      <input type="file" ref={refInput} hidden onChange={handleImage} />
      <div className="postBox pictureBox">
        <div className="box_header">
          <div className="small_circle">
            <i className="exit_icon"></i>
          </div>
          <span>Change Picture</span>
        </div>
        <div className="update_picture_wrap">
          <div className="update_picture_buttons">
            <button className="light_blue_btn bheight"
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
            <button className="blue_btn" onClick={() => setError('')}>
              Try again
            </button>
          </div>
        )}
        <div className="old_picture_wrap"></div>
      </div>
    </div>
  );
}
