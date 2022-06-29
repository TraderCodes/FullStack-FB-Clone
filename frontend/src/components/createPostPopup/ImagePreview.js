import React from 'react';
import { useRef } from 'react';
import EmojiPickerBackgrounds from './EmojiPickerBackgrounds';

export default function ImagePreview({
  text,
  user,
  setText,
  showPrev,
  setShowPrev,
  images,
  setImages,
}) {
  const imageInputRef = useRef(null);
  const handleChange = () => {};
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
      <div className="add_pics_wrap">
        <input
          type="file"
          multiple
          hidden
          ref={imageInputRef}
          onChange={handleChange}
        />
        {/* if images exist */}
        {images && images.length ? (
          ''
        ) : (
          <div
            className="add_pics_inside1"
            onClick={() => {
              imageInputRef.current.click();
            }}
          >
            <div
              className="small_white_circle"
              onClick={() => {
                setShowPrev(false);
              }}
            >
              <i className="exit_icon"></i>
            </div>
            <div
              className="add_col"
        
            >
              <div className="add_circle">
                <i className="addPhoto_icon"></i>
              </div>
              <span>Add Photos/Videos</span>
              <span>or drag and drop</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
