import { useState } from 'react';
import { useRef } from 'react';
import Header from '../../components/header';
import useClickOutside from '../../helpers/clickOutside';
import LeftHome from '../../components/home/left';

export default function Home() {
  const [visible, setVisible] = useState(true);
  const el = useRef(null);
  useClickOutside(el, () => {
    setVisible(false);
    console.log('ga');
  });
  return (
    <div>
      <Header />
      {/* {visible && <div className="card" ref={el}></div>} */}
    <LeftHome/>
    </div>
  );
}
