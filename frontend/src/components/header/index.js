import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import {
  Friends,
  Gaming,
  HomeActive,
  Logo,
  Market,
  Search,
  Watch,
} from '../../svg';

export default function Header() {
  const color = '#65676b';
  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <div className="search search1">
          <Search color={color} />
          <input type="text" className="hide_input" placeholder="Search" />
        </div>
      </div>
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
      <div className="header_right"></div>
    </header>
  );
}
