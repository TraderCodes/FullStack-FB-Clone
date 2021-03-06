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
  setError,
}) {
  const imageInputRef = useRef(null);
  const handleChange = (e) => {
    // change target to array to accept multiple picture
    let files = Array.from(e.target.files);
    console.log(files);
    files.forEach((image) => {
      if (
        image.type !== 'image/jpeg' &&
        image.type !== 'image/png' &&
        image.type !== 'image/webp' &&
        image.type !== 'image/gif'
      ) {
        setError(
          `${image.name} format is unsupported ! only Jpeg, Png, Webp, Gif are allowed.`
        );
        files = files.filter((item) => item.name !== image.name);
        return;
      } else if (image.size > 1024 * 1024) {
        setError(`${image.name} size is too large max 5mb allowed.`);
        // auto filter out images that is not valid
        files = files.filter((item) => item.name !== image.name);
        return;
      } else {
        const reader = new FileReader();
        // read everyimage in array
        reader.readAsDataURL(image);
        reader.onloadend = (readerEvent) => {
          // Add image to setimage in index.js
          setImages((images) => [...images, readerEvent.target.result]);
        };
      }
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
          accept="image/png , image/jpeg ,image/gif,image/webp"
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
              <button
                className="hover1"
                onClick={() => {
                  imageInputRef.current.click();
                }}
              >
                <i className="addPhoto_icon"></i>
                Add Photo / Videos
              </button>
            </div>
            <div
              className="small_white_circle"
              onClick={() => {
                setImages([]);
              }}
            >
              <i className="exit_icon"></i>
            </div>
            <div
              className={
                images.length === 1
                  ? 'preview1'
                  : images.length === 2
                  ? 'preview2'
                  : images.length === 3
                  ? 'preview3'
                  : images.length === 4
                  ? 'preview4 '
                  : images.length === 5
                  ? 'preview5'
                  : images.length % 2 === 0
                  ? 'preview6'
                  : 'preview6 singular_grid'
              }
            >
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
