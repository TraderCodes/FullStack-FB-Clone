import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { search } from '../../function/user';
import useClickOutside from '../../helpers/clickOutside';
import { Return, Search } from '../../svg';
import './style.css';
export default function SearchMenu({ color, setShowSearchMenu, token }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const menu = useRef(null);

  const input = useRef(null);
  useEffect(() => {
    input.current.focus();
  }, []);

  useClickOutside(menu, () => {
    setShowSearchMenu(false);
  });
  const searchHandler = async () => {
    if (searchTerm === '') {
      setResults('');
    }
    // else send data to the backend
    else {
      const res = await search(searchTerm, token);
      setResults(res);
    }
  };
  // console.log(results);
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
        <div className="search">
          <div>
            <Search color={color} />
          </div>
          <input
            type="text"
            placeholder="Search menu"
            ref={input}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={searchHandler}
          />
        </div>
      </div>
      <div className="search_history_header">
        <span>Recent Search</span>
        <a> edit</a>
      </div>
      <div className="search_history"></div>
      <div className="search_results scrollbar">
        {results &&
          results.map((user) => (
            <Link to={`/profile/${user.username}`} className="search_user_item hover1" >
              <img src={user.picture} alt="" />
              <span>
                {user.first_name} {user.last_name}
              </span>
            </Link>
            
          ))}
      </div>
    </div>
  );
}
