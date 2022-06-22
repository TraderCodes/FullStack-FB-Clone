import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import useClickOutside from '../../helpers/clickOutside';
import {
  ArrowDown,
  Friends,
  Gaming,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
} from '../../svg';
import { useSelector } from 'react-redux';
import SearchMenu from './searchMenu';
import AllMenu from './AllMenu';
import UserMenu from './UserMenu';
// Add profile picture from data
export { useSelector } from 'react-redux';

export default function Header() {
  const { user } = useSelector((user) => ({ ...user }));
  const color = '#65676b';
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const allmenu = useRef(null);
  useClickOutside(allmenu, () => {
    setShowAllMenu(false);
  });
  return (
    <header>
      {/* LOGO SECTION */}
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <div className="search search1" onClick={() => setShowSearchMenu(true)}>
          <Search color={color} />
          <input type="text" className="hide_input" placeholder="Search" />
        </div>
      </div>
      {/*  SEARCH SECTION */}
      {showSearchMenu && (
        <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} />
      )}
      {/* MIDDLE MENU */}
      <div className="header_middle">
        <Link to="/" className="middle_icon hover1 active" color={color}>
          <HomeActive />
        </Link>
        <Link to="/" className="middle_icon hover1" color={color}>
          <Friends />
        </Link>
        <Link
          to="/"
          className="middle_icon hover1 .middle-notification"
          color={color}
        >
          <Watch />
          <div className="middle-notification">9+</div>
        </Link>
        <Link to="/" className="middle_icon hover1" color={color}>
          <Market />
        </Link>
        <Link to="/" className="middle_icon hover1" color={color}>
          <Gaming />
        </Link>
      </div>
      {/* PROFILE SECTION 🔴 USER HTML CSS*/}
      <div className="header_right">
        <Link to="/profile" className="profile_link hove1">
          <img src={user?.picture} alt="" />
          <span>{user?.first_name}</span>
        </Link>
        <div
          className="circle_icon hover1"
          onClick={() => {
            setShowAllMenu((prev) => !prev);
          }}
          ref={allmenu}
        >
          <Menu />

          {/* 🔴RIGHT MENU SECTION */}
          {showAllMenu && <AllMenu />}
        </div>
        <div className="circle_icon hover1">
          <Messenger />
        </div>
        <div className="circle_icon hover1">
          <Notifications />
          <div className="right_notification">9</div>
        </div>
        <div className="circle_icon hover1">
          <ArrowDown />
          <UserMenu user={user} />
        </div>
      </div>
    </header>
  );
}
