import axios from "axios";
import { useEffect, useReducer } from "react";
import { photosReducer } from "../../function/reducer";


export default function Photos({ photos}) {
  //  const [{ photos }, dispatch] = useReducer(photosReducer, {
   
  //    error: '',
  //   phtos: {},
  //  });


  //  // Call useEffect when name change
  //  useEffect(() => {
  //    getPhotos();
  //  }, [username]);
  //  // check if user is a visitor
  //  const path=`${username}/*`
  //  const max =30;
  //  const sort = 'desc'


  //  const getPhotos = async (name) => {
  //    try {
  //      dispatch({
  //        type: 'PHOTOS_REQUEST',
  //      });
  //      const { data } = await axios.post(
  //        `${process.env.REACT_APP_BACKEND_URL}/listImages`,{path,sort,max},
  //        {
  //          headers: {
  //            Authorization: `Bearer ${token}`,
  //          },
  //        }
  //      );
  
  //        dispatch({
  //          type: 'PHOTOS_SUCCESS',
  //          // data that fetch from backend
  //          payload: data,
  //        });
       
  //    } catch (error) {
  //      dispatch({
  //        type: 'PHOTOS_ERROR',
  //        payload: error.response.data.message,
  //      });
  //    }
  //  };
  //  console.log(photos)
  return (
    <div className="profile_card">
      <div className="profile_card_header">
        Photos
        <div className="profile_header_link">See all photos</div>
      </div>
      <div className="profile_card_count">
        {photos.total_count === 0
          ? ""
          : photos.total_count === 1
          ? "1 PHOTOS"
          : `${photos.total_count} photos`}
      </div>
      <div className="profile_card_grid">
        {photos.resources &&
          photos.resources.slice(0, 9).map((img) => (
            <div className="profile_photo_card" key={img.public_id}>
              <img src={img.secure_url} alt="" />
            </div>
          ))}
      </div>
    </div>
  );
}
