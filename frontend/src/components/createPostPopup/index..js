import './style.css';
import { useEffect, useRef, useState } from 'react';
import Picker from 'emoji-picker-react';
import EmojiPickerBackgrounds from './EmojiPickerBackgrounds';
import AddToYourPost from './AddToYourPost';
import ImagePreview from './ImagePreview';
import PulseLoader from 'react-spinners/PulseLoader';
import useClickOutside from '../../helpers/clickOutside';
import { createPost } from '../../function/post';
export default function CreatePostPopup({ user, setPopupVisible }) {
  const [text, setText] = useState('');
  const [showPrev, setShowPrev] = useState(false);
  const [picker, setPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const textRef = useRef(null);
  const closePopup = useRef(null);
  useClickOutside(closePopup, () => {
    setPopupVisible(false);
  });
  const postSubmit = async () => {
    // if textare contain background text
    if (background) {
      
 
          setLoading(true);
    
      const response = await createPost(
        null,
        background,
        text,
        null,
        user.id,
        user.token
        );
      setLoading(false);
      if (response === 'ok') {
        setBackground('');
        setText('');
        setPopupVisible(false);
      } else {
        setPopupVisible(response);
      }
    }
  };

  const [background, setBackground] = useState('');

  // console.log(images)
  // console.log(text);
  return (
    <div className="blur">
      <div className="postBox" ref={closePopup}>
        <div className="box_header">
          <div className="small_circle" onClick={() => setPopupVisible(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Create post</span>
        </div>
        {/* profile section */}
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

        {!showPrev ? (
          <>
            <EmojiPickerBackgrounds
              text={text}
              user={user}
              setText={setText}
              showPrev={showPrev}
              setBackground={setBackground}
              background={background}
            />
          </>
        ) : (
          <ImagePreview
            text={text}
            user={user}
            setText={setText}
            showPrev={showPrev}
            images={images}
            setImages={setImages}
            setShowPrev={setShowPrev}
          />
        )}
        <AddToYourPost setShowPrev={setShowPrev} />
        <button
          className="post_submit"
          onClick={() => {
            postSubmit();
          }}
        >
          {loading ? <PulseLoader color="#fff" size={5} /> : 'Post'}
        </button>
      </div>
    </div>
  );
}
// npm i emoji-picker-react
