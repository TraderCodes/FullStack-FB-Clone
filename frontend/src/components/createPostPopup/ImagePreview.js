import React from 'react'
import EmojiPickerBackgrounds from './EmojiPickerBackgrounds';

export default function ImagePreview({text,user,setText,showPrev}) {
  return (
    <div className="overflow_a">
      <EmojiPickerBackgrounds
        text={text}
        user={user}
        setText={setText}
        showPrev={showPrev}
        type2
        // setBackground={setBackground}
        // background={background}
      />
    </div>
  );
}
