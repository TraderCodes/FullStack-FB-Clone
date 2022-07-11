import { useState } from 'react';
import './style.css';
export default function UpdateProfilePicture({ setImage }) {
  const [description, setDescription] = useState('');
  return (
    <div className="postBox update_img">
      <div className="box_header">
        <div className="small_circle" onClick={() => setImage('')}>
          <i className="exit_icon"></i>
        </div>
        <span>Change Picture</span>
      </div>
      <div className="update_image_desc">
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea_blue details_input"
        ></textarea>
      </div>
      <div className="update_center">
        <div className="crooper"></div>
      </div>
    </div>
  );
}
