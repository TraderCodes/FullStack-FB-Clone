import { useState } from 'react';
import './style.css';
// getting data from models
export default function Intro({ details,visitor }) {
  const initial = {
    // if details . bio exist
    bio: details?.bio ? details.bio : 'Welcome to my profile',
    othername: details?.othername ? details.othername : '',
    job: details?.job ? details.job : '',
    workplace: details?.workplace ? details.workplace :'Google',
    highSchool: details?.highSchool ? details.highSchool : 'high school',
    college: details?.college ? details.college : 'college',
    currentCity: details?.currentCity ? details.currentCity : 'Tanger',
    hometown: details?.hometown ? details.hometown : 'Taiwan',
    relationship: details?.relationship ? details.relationship : 'Single',
    instagram: details?.instagram ? details.instagram : 'none',
  };
  const [infos, setInfos] = useState(initial);
  return (
    <div className="profile_card">
      <div className="profile_card_header">Intro</div>
      {infos?.bio && (
        <div className="info_col">
          <span className="info_text">{infos.bio} </span>
          {!visitor && (
            <button className="gray_btn hover1 bheight">Edit Bio</button>
          )}
        </div>
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
