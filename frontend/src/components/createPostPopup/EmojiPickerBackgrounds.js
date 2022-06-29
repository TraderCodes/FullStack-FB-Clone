import { useEffect, useRef, useState } from 'react';
import Picker from 'emoji-picker-react';
import { useSelector } from 'react-redux';

export default function EmojiPickerBackgrounds({
  text,

  setText,
  type2,
  background,
  setBackground,
}) {
  const { user } = useSelector((state) => ({ ...state }));

  // run useeffect everytimem cursorPosition changes
  const [cursorPosition, setCursorPosition] = useState();
  const textRef = useRef(null);
  const [picker, setPicker] = useState(false);

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const handleEmoji = (e, { emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);

    setCursorPosition(start.length + emoji.length);
  };
  return (
    <div className={type2 ? 'images_input':""}>
      <div className={!type2 ? 'flex_center':''}>
        <textarea
          //  set useref so when called it focus on the text area
          ref={textRef}
          // 👇IMPORTANT
          value={text}
          maxLength="150"
          className={`post_input ${type2 ? 'input2':''}`}
          placeholder={`Enter what you like ${user.first_name}`}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <div className={!type2 ? 'post_emojis_wrap':''}>
        {picker && (
          <div
            className={`comment_emoji_picker ${
              type2 ? 'movepicker' : 'rlmove'
            }`}
          >
            <Picker onEmojiClick={handleEmoji} />
          </div>
        )}
        {!type2 && <img src="../../../icons/colorful.png" alt="" />}
        <i
          className={`emoji_icon_large ${type2 ? 'moveleft':''}`}
          onClick={() => setPicker((prev) => !prev)}
        ></i>
      </div>
    </div>
  );
}
