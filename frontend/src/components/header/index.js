import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import useClickOutside from '../../helpers/clickOutside';
import {
  ArrowDown,
  Friends,
  Gaming,
  Home,
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
import UserMenu from './userMenu/index.js';
// Add profile picture from data
export { useSelector } from 'react-redux';
// added code.js into models which is saved into database

export default function Header({ page }) {
  const { user } = useSelector((user) => ({ ...user }));
  const color = '#65676b';
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const allmenu = useRef(null);
  useClickOutside(allmenu, () => {
    setShowAllMenu(false);
  });
  const usermenu = useRef(null);
  useClickOutside(usermenu, () => {
    setShowProfileMenu(false);
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
        <Link
          to="/"
          className={`middle_icon ${page === 'home' ? 'active' : 'hover1'}`}
          color={color}
        >
          {page === 'home' ? <HomeActive /> : <Home color={color} />}
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
        <Link
          to="/profile"
          className={`profile_link hover1 ${
            page === 'profile' ? 'active_link' : ''
          }`}
        >
          <img src={user?.picture} alt="" />
          <span>{user?.first_name}</span>
        </Link>
        <div
          className={`circle_icon hover1 ${showAllMenu && 'active_header'}`}
          ref={allmenu}
        >
          <div
            onClick={() => {
              setShowAllMenu((prev) => !prev);
            }}
          >
            <Menu />
          </div>

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
        <div
          className={`circle_icon hover1 ${showProfileMenu && 'active_header'}`}
          ref={usermenu}
        >
          <div
            onClick={() => {
              setShowProfileMenu((prev) => !prev);
            }}
          >
            <ArrowDown />
          </div>
          {showProfileMenu && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  );
}
