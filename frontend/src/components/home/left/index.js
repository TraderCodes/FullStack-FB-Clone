import LeftLink from './LeftLink';
import './style.css';
import { left } from '../../../data/home';
import { Link } from 'react-router-dom';
import { ArrowDown1 } from '../../../svg';
import { useState } from 'react';
import Shortcut from './Shortcut';
export default function LeftHome({ user }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="left_home scrollbar ">
      <Link to="/profile" className="left_link hover1">
        <img src={user?.picture} alt="" />
        <span>
          {user?.first_name} {user.last_name}
        </span>
      </Link>
      {left.slice(0, 8).map((link, i) => (
        <LeftLink
          key={i}
          img={link.img}
          text={link.text}
          notification={link.notification}
        />
      ))}
      {!visible && (
        <div className="left_link hover1" onClick={() => setVisible(true)}>
          <div className="small_circle">
            {/* 🔴 EXTEND */}
            <ArrowDown1 />
          </div>
          <span> Show more</span>
        </div>
      )}{' '}
      {visible && (
        <div className="more_left">
          {left.slice(0, left.length).map((link, i) => (
            <LeftLink
              key={i}
              img={link.img}
              text={link.text}
              notification={link.notification}
            />
          ))}
          <div className="left_link hover1" onClick={() => setVisible(false)}>
            <div className="small_circle rotate180">
              <ArrowDown1 />
            </div>
            <span>Show less</span>
          </div>
        </div>
      )}
      <div className="splitter"></div>
      <div className="shortcut">
        <div className="heading">ShortCuts</div>
        <div className="edit_shortcut">edit</div>
      </div>
      <div className="shortcut_list " >
        <Shortcut
          link="https://github.com/TraderCodes"
          img="../../images/github.svg"
          name="Github"
        />
        <Shortcut
          link="https://github.com/TraderCodes"
          img="../../images/ytb.png"
          name="Youtube"
        />
      </div>
      <div className={`fb_copyright ${visible && 'relative_fb_copyright'}`}>
        <Link to="/">
          Hey Visitors ! 
          {/* <img src="../../images/github.svg"></img> */}
          <br />
        </Link>
        <Link to="/"></Link>This is Made by
        <br /> <Link to="/"> Jamal Sheriff </Link>
        <br />
        Project to Challenge myself 2022 ©
      </div>
    </div>
  );
}
