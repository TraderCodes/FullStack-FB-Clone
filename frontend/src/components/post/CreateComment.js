import { useEffect, useRef, useState } from 'react';
import Picker from 'emoji-picker-react';
import React from 'react';

export default function CreateComment({ user }) {
  const [picker, setPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const textRef = useRef(null);
  // const bgRef = useRef(null);
  const [text, setText] = useState('');
  // const [showBgs, setShowBgs] = useState(true);
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
    <div className="create_comment_wrap">
      <div className="create_comment">
        <img src={user?.picture} alt="" />
        {/* INPUT SECTION */}
        <div className="comment_input_wrap">
          {picker && 
          <div className="comment_emoji_picker">
              <Picker onEmojiClick={handleEmoji} />
          </div>
              }
        
          <input type="file" hidden />
          <input
            type="text"
            ref={textRef}
            value={text}
            placeholder={'Leave a comment'}
            onChange={(e) => setText(e.target.value)}
          />
          <div
            className="comment_circle_icon hover1 filter1"
            onClick={() => setPicker((prev) => !prev)}
          >
            <i className="emoji_icon filter1"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
