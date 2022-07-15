import { useState } from 'react';
import Bio from './Bio';
import './style.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

// getting data from models
export default function Intro({ details, visitor }) {
  const { user } = useSelector((state) => ({ ...state }));

  const [visible, setVisible] = useState(false);
  const initial = {
    // if details . bio exist
    bio: details?.bio ? details.bio : '',
    othername: details?.othername ? details.othername : '',
    job: details?.job ? details.job : '',
    workplace: details?.workplace ? details.workplace : 'Google',
    highSchool: details?.highSchool ? details.highSchool : 'high school',
    college: details?.college ? details.college : 'college',
    currentCity: details?.currentCity ? details.currentCity : 'Tanger',
    hometown: details?.hometown ? details.hometown : 'Taiwan',
    relationship: details?.relationship ? details.relationship : 'Single',
    instagram: details?.instagram ? details.instagram : 'none',
  };
  const [infos, setInfos] = useState(initial);
  const [showBio, setShowBio] = useState(true);
  // claculate amount of text in bio text area
  const [max, setMax] = useState(infos?.bio ? 100 - infos?.bio.length : 100);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfos({ ...infos, [name]: value });
    setMax(100 - e.target.value.length);
  };

  return (
    <div className="profile_card">
      <div className="profile_card_header">Intro</div>
      {infos?.bio &&  (
        <div className="info_col">
          <span className="info_text">{infos.bio} </span>
          {!visitor && (
            <button
              className="gray_btn hover1 bheight"
              onClick={() => setShowBio(true)}
            >
              Edit Bio
            </button>
          )}
        </div>
      )}
      {/* bio */}
      {showBio && (
        <Bio
          infos={infos}
          max={max}
          handleChange={handleChange}
          setShowBio={setShowBio}
          // updateDetails={updateDetails}
          placeholder="Add Bio"
          name="bio"
        />
      )}
      {infos.job && infos.workplace ? (
        <div className="info_profile">
          <img src="../../../icons/job.png" alt="" />
          Works as{infos.job} at<b>{infos.workplace}</b>
        </div>
      ) : infos.job && !infos.workplace ? (
        <div className="info_profile">
          <img src="../../../icons/job.png" alt="" />
          Works as<b>{infos.job}</b>
        </div>
      ) : (
        infos.workplace &&
        !infos.job && (
          <div className="info_profile">
            <img src="../../../icons/job.png" alt="" />
            Works at <b>{infos.workplace}</b>
          </div>
        )
      )}
      {infos?.relationship && (
        <div className="info_profile">
          <img src="../../../icons/relationship.png" alt="" />
          <b>{infos.relationship}</b>
        </div>
      )}
      {infos?.college && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" alt="" />
          Studied at <b>{infos.college}</b>
        </div>
      )}
      {infos?.highSchool && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" alt="" />
          Studied at <b>{infos.highSchool}</b>
        </div>
      )}
      {infos?.currentCity && (
        <div className="info_profile">
          <img src="../../../icons/home.png" alt="" />
          Lives in <b>{infos.currentCity}</b>
        </div>
      )}
      {infos?.hometown && (
        <div className="info_profile">
          <img src="../../../icons/home.png" alt="" />
          From <b>{infos.hometown}</b>
        </div>
      )}
      {infos?.hometown && (
        <div className="info_profile">
          <img src="../../../icons/instagram.png" alt="" />
          <a
            href={`https://www.instagram.com/${infos.instagram}`}
            target="_blank"
          >
            {' '}
            <b>{infos.instagram}</b>
          </a>
        </div>
      )}
      {!visitor && (
        <button className="gray_btn hover1 w100">Add Hobbies</button>
      )}
      {!visitor && (
        <button className="gray_btn hover1 w100">Add Featured</button>
      )}
    </div>
  );
}
