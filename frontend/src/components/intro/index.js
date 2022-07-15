import { useState } from 'react';
import './style.css';
// getting data from models
export default function Intro({ details }) {
  const initial = {
    // if details . bio exist
    bio: details?.bio ? details.bio : '',
    othername: details?.othername ? details.othername : '',
    job: details?.job ? details.job : '',
    workplace: details?.workplace ? details.workplace : 'Google',
    highSchool: details?.highSchool ? details.highSchool : 'some high school',
    college: details?.college ? details.college : 'some college',
    currentCity: details?.currentCity ? details.currentCity : 'Tanger',
    hometown: details?.hometown ? details.hometown : 'Taiwan',
    relationship: details?.relationship ? details.relationship : 'Single',
    instagram: details?.instagram ? details.instagram : 'none',
  };
  const [infos, setInfos] = useState(initial);
  return (
    <div className="profile_card">
      <div className="profile_card_header">Intro</div>
      {infos.job && infos.workplace ? (
        <div className="info_profile">
          <img src="../../../icons/job.png" alt="" />
          Works as {infos.job} at <b>{infos.workplace}</b>
        </div>
      ) : infos.job && !infos.workplace ? (
        <div className="info_profile">
          <img src="../../../icons/job.png" alt="" />
          Works as {infos.job}
        </div>
      ) : (
        infos.workplace &&
        !infos.job && (
          <div className="info_profile">
            <img src="../../../icons/job.png" alt="" />
            Works at {infos.workplace}
          </div>
        )
      )}
      {infos?.relationship && (
        <div className="info_profile">
          <img src="../../../icons/relationship.png" alt="" />
          {infos.relationship}
        </div>
      )}
      {infos?.college && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" alt="" />
          Studied at {infos.college}
        </div>
      )}
      {infos?.highSchool && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" alt="" />
          Studied at {infos.highSchool}
        </div>
      )}
      {infos?.currentCity && (
        <div className="info_profile">
          <img src="../../../icons/home.png" alt="" />
          Lives in {infos.currentCity}
        </div>
      )}
      {infos?.hometown && (
        <div className="info_profile">
          <img src="../../../icons/home.png" alt="" />
          From {infos.hometown}
        </div>
      )}
      {infos?.hometown && (
        <div className="info_profile">
          <img src="../../../icons/instagram.png" alt="" />
          <a
            href={`https://www.instagram.com/${infos.instagram}`}
            target="_blank"
          >
            {infos.instagram}
          </a>
        </div>
      )}
    </div>
  );
}
