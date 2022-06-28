import './style.css';
import { useRef, useState } from 'react';
import Picker from 'emoji-picker-react';
export default function CreatePostPopup({ user }) {
  const [text, setText] = useState('');
  const [showPrev, setShowPrev] = useState(false);
  const [picker, setPicker] = useState(false);
  const textRef = useRef(null);
// 



  const handleEmoji = (e,{ emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
  };

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
        <div className="post_emojis_wrap">
          {picker && (
            <div className="comment_emoji_picker rlmove">
              <Picker onEmojiClick={handleEmoji} />
            </div>
          )}
          <img src="../../../icons/colorful.png" alt="" />
          <i
            className="emoji_icon_large"
            onClick={() => setPicker((prev) => !prev)}
          ></i>
        </div>
      </div>
    </div>
  );
}
// npm i emoji-picker-react
