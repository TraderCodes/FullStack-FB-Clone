import { useState } from 'react';
import { useRef } from 'react';
import Header, { useSelector } from '../../components/header';
import useClickOutside from '../../helpers/clickOutside';
import LeftHome from '../../components/home/left';
import RightHome from '../../components/home/right';
import Stories from '../../components/home/stories/index';
import './style.css';
import CreatePost from '../../components/createPost';
import SendVerification from '../../components/home/sendVerification';
import Post from '../../components/post';
import { useEffect } from 'react';

export default function Home({ setPopupVisible, posts }) {
  // const { user } = useSelector((user) => ({ ...user }));
  const { user } = useSelector((state) => ({ ...state }));
  const [visible, setVisible] = useState(true);
  const [height, setHeight] = useState();
  const middle = useRef(null);
  const [scrolling, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(100);
  useEffect(() => {
    // fix background image to fully show
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
      setScrolling(e.target.documentElement.scrollTop > scrollTop);
    };
    window.addEventListener('scroll', onScroll);

    setHeight(middle.current.clientHeight);
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollTop]);

  const el = useRef(null);
  useClickOutside(el, () => {
    setVisible(false);
    // console.log('ga');
  });
  return (
    <div className="home" style={{ height: `${height + 70}px` }}>
      <Header />
      <LeftHome user={user} />
      <div className="home_middle" ref={middle}>
        <Stories />
        {user.verified === false && <SendVerification user={user} />}
        <CreatePost user={user} setPopupVisible={setPopupVisible} />
        {posts.map((post) => (
          <div className="post" key={post._id}>
            <Post post={post} key={post._id} user={user} />
          </div>
        ))}
      </div>
      <RightHome user={user} />
    </div>
  );
}
