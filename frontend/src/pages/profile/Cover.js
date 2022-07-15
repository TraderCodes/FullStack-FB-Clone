import { useState, useRef } from 'react';
import useClickOutside from '../../helpers/clickOutside';

export default function Cover({ cover, visitor }) {
  const [showCoverMenu, setShowCoverMenu] = useState(false);
  const [coverPicture, setCoverPicture] = useState('');
  const menuRef = useRef(null);
  const refInput = useRef(null);
  useClickOutside(menuRef, () => setShowCoverMenu(false));
    const [error, setError] = useState('d');
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
        setCoverPicture(event.target.result);
      };
    };
    console.log(coverPicture);
  return (
    <div className="profile_cover" ref={menuRef}>
      <input
        type="file"
        ref={refInput}
        hidden
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleImage}
      />
      {error && (
        <div className="postError comment_error">
          <div className="postError_error">{error}</div>
          <button className="blue_btn " onClick={() => setError('')}>
            Try again
          </button>
        </div>
      )}

      {cover && <img src={cover} className="cover" alt="" />}
      {!visitor && (
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
              <div
                className="open_cover_menu_item hover1"
                onClick={() => refInput.current.click()}
              >
                <i className="upload_icon "></i>
                Upload Photo
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
