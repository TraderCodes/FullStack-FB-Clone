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
  const handleChange = (e) => {
    // change target to array to accept multiple picture
    let files = Array.from(e.target.files);
    console.log(files);
    files.forEach((image) => {
      const reader = new FileReader();
      // read everyimage in array
      reader.readAsDataURL(image);
      reader.onloadend = (readerEvent) => {
        // Add image to setimage in index.js
        setImages((images) => [...images, readerEvent.target.result]);
      };
    });
  };
  return (
    <div className="overflow_a scrollbar">
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
          <div className="add_pics_inside1 p0">
            <div className="preview_actions">
              <button>
                <i className="edit_icon"></i>
                Edit
              </button>
              <button>
                <i className="edit_icon"></i>
                Add Photo / Videos
              </button>
            </div>
            <div className="small_white_circle">
              <i className="exit_icon"></i>
            </div>
            <div >
              {images.map((img, i) => (
                <img src={img} alt={i}></img>
              ))}
            </div>
          </div>
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
            <div className="add_col">
              <div className="add_circle">
                <i className="addPhoto_icon"></i>
              </div>
              <span>Add Photos / Videos</span>
              <span>or drag and drop</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
