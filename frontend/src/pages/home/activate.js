import { useState } from 'react';
import { useRef } from 'react';
import Header, { useSelector } from '../../components/header';
import useClickOutside from '../../helpers/clickOutside';
import LeftHome from '../../components/home/left';
import RightHome from '../../components/home/right';
import Stories from '../../components/home/stories/index';
import './style.css';
import CreatePost from '../../components/createPost';
import ActivateForm from './ActivateForm';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import User from '../../../../backend/models/User';
import { useDispatch } from 'react-redux';
export default function Activate() {
  const { user } = useSelector((user) => ({ ...user }));
  // adding usestate for success error and loading
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState('');
  // get token with useparam
  const { token } = useParams();
  // console.log("🚀 ~ token", token)
  const dispatch = useDispatch();
  useEffect(() => {
    activateAccount();
  }, []);
  const activateAccount = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/activate`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSuccess(data.message);
      // change cookie verfied value to true
      Cookies.set('user', JSON.stringify({ ...user, verified: true }));
      // change element in the store by using dispatch
      dispatch ({
        type:'VERIFY',
        payload:true
      })
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="home">
      {success && (
        <ActivateForm
          type="success"
          header="Account Activated"
          text={success}
          isLoading={isLoading}
        />
      )}
      {error && (
        <ActivateForm
          type="error"
          header="Account Verification Failed"
          text={error}
          isLoading={isLoading}
        />
      )}
      <Header />
      {/* Activate component */}

      <LeftHome user={user} />
      <div className="home_middle">
        <Stories />
        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
}
