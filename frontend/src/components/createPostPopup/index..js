import './style.css';
import { useEffect, useRef, useState } from 'react';
import Picker from 'emoji-picker-react';
import EmojiPickerBackgrounds from './EmojiPickerBackgrounds';
import AddToYourPost from './AddToYourPost';
import ImagePreview from './ImagePreview';
import PulseLoader from 'react-spinners/PulseLoader';
import useClickOutside from '../../helpers/clickOutside';
import { createPost } from '../../function/post';
import PostError from './PostError';
import dataURItoBlob from '../../helpers/dataURItoBlob';
import { uploadImages } from '../../function/uploadImages';
export default function CreatePostPopup({ user, setPopupVisible }) {
  const [text, setText] = useState('');
  const [showPrev, setShowPrev] = useState(false);
  const [picker, setPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const textRef = useRef(null);
  const closePopup = useRef(null);
  const [background, setBackground] = useState('');
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
    }else if (images && images.length) {
      setLoading(true);
      const postImages = images.map((img) => {
        return dataURItoBlob(img);
      });
      // make sure there is no space orelse won't be able to get images from cloudinary
      const path = `${user.username}/post_Images`;
      let formData = new FormData();
      formData.append('path', path);
      postImages.forEach((image) => {
        formData.append('file', image);
      });
      const response = await uploadImages(formData, path, user.token);
      const res = await createPost(
        null,
        null,
        text,
        response,
        user.id,
        user.token
      );
      setLoading(false);
      if (res === 'ok') {
        setText('');
        setImages('');
        setPopupVisible(false);
      } else {
        setError(res);
      }
    } else if (text) {
      setLoading(true);
      const response = await createPost(
        null,
        null,
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
        setError(response);
      }
    } else {
      console.log('nothing');
    }
  };



  // console.log(images)
  // console.log(text);
  return (
    <div className="blur">
      <div className="postBox" ref={closePopup}>
        {error && <PostError error={error} setError={setError} />}

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
