import './style.css';
import { useEffect, useRef, useState } from 'react';
import Picker from 'emoji-picker-react';
import EmojiPickerBackgrounds from './EmojiPickerBackgrounds';
export default function CreatePostPopup({ user }) {
  const [text, setText] = useState('');
  const [showPrev, setShowPrev] = useState(false);
  const [picker, setPicker] = useState(false);
  const textRef = useRef(null);

  console.log(text);
  return (
    <div className="blur">
      <div className="postBox">
        <div className="box_header">
          <div className="small_circle">
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

        {!showPrev && (
          <div className="flex_center">
            <textarea
              //  set useref so when called it focus on the text area
              ref={textRef}
              // 👇IMPORTANT
              value={text}
              maxLength="150"
              className="post_input"
              placeholder={`Enter what you like ${user.first_name}`}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
        )}
        <EmojiPickerBackgrounds         
               text={text}
              user={user}
              setText={setText}
              showPrev={showPrev}
              textRef={textRef}
              // setBackground={setBackground}
              // background={background}
              />
      </div>
    </div>
  );
}
// npm i emoji-picker-react
