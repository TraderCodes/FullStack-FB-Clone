import { useState } from 'react';
import './style.css';
// getting data from module
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
    hometown: details?.hometown ? details.hometown : 'Morocco',
    relationship: details?.relationship ? details.relationship : 'Single',
    instagram: details?.instagram ? details.instagram : '',
  };
  const [infos, setInfos] = useState(initial);
  return (

  );
}
