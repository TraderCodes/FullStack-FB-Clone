import { useState } from 'react';
import { useRef } from 'react';
import Header, { useSelector } from '../../components/header';
import useClickOutside from '../../helpers/clickOutside';
import LeftHome from '../../components/home/left';
import RightHome from '../../components/home/right';
import Stories from '../../components/home/stories/index';
import './style.css';
import CreatePost from '../../components/createPost';

export default function Home() {
  const { user } = useSelector((user) => ({ ...user }));
  const [visible, setVisible] = useState(true);
  const el = useRef(null);
  useClickOutside(el, () => {
    setVisible(false);
    console.log('ga');
  });
  return (
    <div className="home">
      <Header />
      {/* {visible && <div className="card" ref={el}></div>} */}
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories />
        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
}
