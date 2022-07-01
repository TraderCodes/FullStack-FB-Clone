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

export default function Home({ setPopupVisible, posts }) {
  // const { user } = useSelector((user) => ({ ...user }));
  const { user } = useSelector((state) => ({ ...state }));
  const [visible, setVisible] = useState(true);
  const el = useRef(null);
  useClickOutside(el, () => {
    setVisible(false);
    // console.log('ga');
  });
  return (
    <div className="home">
      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories />
        {user.verified === false && <SendVerification user={user} />}
        <CreatePost user={user} setPopupVisible={setPopupVisible} />
        {posts.map((post) => (
          <div className="post" key={post._id}>
            <Post post={post} key={post._id} />
          </div>
        ))}
      </div>
      <RightHome user={user} />
    </div>
  );
}
