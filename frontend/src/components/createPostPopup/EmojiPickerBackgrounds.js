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
  const bgRef = useRef(null);
  const [showBgs, setShowBgs] = useState(true);
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
  const postBackgrounds = [
    '../../../images/postbackgrounds/1.jpg',
    '../../../images/postbackgrounds/2.jpg',
    '../../../images/postbackgrounds/3.jpg',
    '../../../images/postbackgrounds/4.jpg',
    '../../../images/postbackgrounds/5.jpg',
    '../../../images/postbackgrounds/6.jpg',
    '../../../images/postbackgrounds/7.jpg',
    '../../../images/postbackgrounds/8.jpg',
    '../../../images/postbackgrounds/9.jpg',
  ];

  // handle text background
  const backgorundHandler = (i) => {
    bgRef.current.style.backgroundImage = `url(${postBackgrounds[i]})`;

    setBackground(postBackgrounds[i]);
    bgRef.current.classList.add('bgHandler');
  };
  const removeBackground = (i) => {
    bgRef.current.style.backgroundImage = ``;
    setBackground('');
    bgRef.current.classList.remove('bgHandler');
  };
  return (
    <div className={type2 ? 'images_input' : ''}>
      <div className={!type2 ? 'flex_center' : ''} ref={bgRef}>
        <textarea
          //  set useref so when called it focus on the text area
          ref={textRef}
          // 👇IMPORTANT
          value={text}
          maxLength="250"
          className={`post_input ${type2 ? 'input2' : ''}`}
          placeholder={`Type here if  ${user.first_name}`}
          onChange={(e) => setText(e.target.value)}
          // 🔴 change textarea padding base of text length
          // if remove background then padding is 0
          style={{
            paddingTop: `${
              background
                ? Math.abs(textRef.current.value.length * 0.1 - 30)
                : '0'
            }%`,
          }}
        ></textarea>
      </div>
      <div className={!type2 ? 'post_emojis_wrap' : ''}>
        {picker && (
          <div
            className={`comment_emoji_picker ${
              type2 ? 'movepicker' : 'rlmove'
            }`}
          >
            <Picker onEmojiClick={handleEmoji} />
          </div>
        )}
        {!type2 && (
          <img
            src="../../../icons/colorful.png"
            alt=""
            onClick={() => setShowBgs((prev) => !prev)}
          />
        )}
        {!type2 && showBgs && (
          <div className="post_backgrounds">
            <div className="no_bg" onClick={() => removeBackground()}>
              None
            </div>
            {postBackgrounds.map((bg, i) => (
              <img
                src={bg}
                key={i}
                alt=""
                // pass in index show base on index
                onClick={() => backgorundHandler(i)}
              />
            ))}
          </div>
        )}
        <i
          className={`emoji_icon_large ${type2 ? 'moveleft' : ''}`}
          onClick={() => setPicker((prev) => !prev)}
        ></i>
      </div>
    </div>
  );
}
