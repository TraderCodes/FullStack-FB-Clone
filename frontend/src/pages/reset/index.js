import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { Form, Formik, formik } from 'formik';
import LoginInput from '../../components/inputs/logininput';
import { useState } from 'react';

export default function Reset() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  const [visible, setVisible] = useState(0);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [conf_password, setConf_password] = useState('');
  const [error, setError] = useState('');
  const [userInfos, setUserInfos] = useState('');

  const logout = () => {
    Cookies.set('user', '');
    dispatch({
      type: 'LOGOUT',
    });
    navigate('/login');
  };
  return (
    // 🔴HEADER
    <div className="reset">
      <div className="reset_header">
        <img src="../../../icons/facebook.svg" alt="" />
        {user ? (
          <div className="right_reset">
            <Link to="/profile">
              <img src={user.picture} alt="" />
            </Link>
            <button
              className="blue_btn"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="right_reset">
            <button className="blue_btn">Login</button>
          </Link>
        )}
      </div>
      <div className="reset_wrap">
        <div className="reset_form">
          <div className="reset_form_header">Find Your Account</div>
          <div className="reset_form_text">
            Please enter your email address or mobile number to search for your
            account.
          </div>
          <Formik
            enableReinitialize
            initialValues={{
              email,
            }}
            // validationSchema={validateEmail}
            onSubmit={() => {
              // handleSearch();
            }}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address or phone number"
                />
                {error && <div className="error_text">{error}</div>}
                <div className="reset_form_btns">
                  <Link to="/login" className="gray_btn">
                    Cancel
                  </Link>
                  <button type="submit" className="blue_btn">
                    Search
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
