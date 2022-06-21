import { useEffect, useRef } from 'react';
import useClickOutside from '../../helpers/clickOutside';
import { Return, Search } from '../../svg';
import './style.css';
export default function SearchMenu({ color, setShowSearchMenu }) {
  const menu = useRef(null);
  const input = useRef(null);
useEffect(() => {
input.current.focus()
}, [])

  useClickOutside(menu, () => {
    setShowSearchMenu(false);
  });
  return (
    <div className="header_left search_area scrollbar " ref={menu}>
      <div className="search_wrap">
        <div className="header_logo">
          <div
            className="circle hover1"
            onClick={() => {
              setShowSearchMenu(false);
            }}
          >
            <Return color={color} />
          </div>
        </div>
        <div
          className="search"    
        >
          <div>
            <Search color={color} />
          </div>
          <input type="text" placeholder="Search menu" ref={input} />
        </div>
      </div>
      <div className="search_history_header">
        <span>Recent Search</span>
        <a> edit</a>
      </div>
      <div className="search_history"></div>
      <div className="search_results scrollbar"></div>
    </div>
  );
}
