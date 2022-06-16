// install formail and yup
import './style.css';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import LoginInput from '../../components/inputs/logininput';
import { useState } from 'react';
import * as Yup from 'yup';
const loginInfo = {
  email: '',
  password: '',
};
export default function Login() {
  // pass the value into state with enabbleinitilize value from formik
  const [login, setLogin] = useState(loginInfo);
  const { email, password } = login;
  console.log(login);
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const loginValidation = Yup.object({
    email: Yup.string().required('Email Address Needed'),
    password: Yup.string().required('Enter Password'),
  });
  return (
    <div className="login">
      <div className="login_wrapper">
        <div className="login_wrap">
          {/* //login 1 = LOGO🟢  // loging 2 = signup 🟢*/}
          <div className="login_1">
            <img src="../../icons/facebook.svg" alt="" />
            <span >
              Facebook Clone Created by <b>TraderCodes</b><br/> 
            </span>
          </div>
          <div className="login_2">
            <div className="login_2_wrap">
              <Formik
                enableReinitialize
                initialValues={{
                  email,
                  password,
                }}
                // ADD Yup 🔴 return yup  #21
                validationSchema={loginValidation}
              >
                {(Formik) => (
                  <Form>
                    <LoginInput
                      type="text"
                      name="email"
                      placeholder="Email Address"
                      onChange={handleLoginChange}
                    />
                    <LoginInput
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleLoginChange}
                      bottom
                    />
                    <button type="submit" className="blue_btn">
                      Log In
                    </button>
                  </Form>
                )}
              </Formik>
              <Link to="/forgot" className="forgot_password">
                Forgot password ?
              </Link>
              {/* splitter */}
              <div className="sign_splitter"></div>
              <button className="blue_btn open_signup" id="demo">
                Demo Login
              </button>
              <button className="blue_btn open_signup">
                Create NewAccount
              </button>
            </div>
            {/* Create a page text */}
            <Link to="/" className="sign_extra">
              <b>Create a Page</b> for a celebrity, brand or business
            </Link>
          </div>
        </div>
        <div className="register"> </div>
          <footer className="login_footer">
          <div className="login_footer_wrap">
            <Link to="/">English(UK)</Link>
            <Link to="/">Français(FR)</Link>
            <Link to="/">العربية</Link>
            <Link to="/">ⵜⴰⵎⴰⵣⵉⵖⵜ</Link>
            <Link to="/">Español (España)</Link>
            <Link to="/">italiano</Link>
            <Link to="/">Deutsch</Link>
            <Link to="/">Português (Brasil)</Link>
            <Link to="/">हिन्दी</Link>
            <Link to="/">中文(简体)</Link>
            <Link to="/">日本語</Link>
            <Link to="/" className="footer_square">
              <i className="plus_icon"></i>
            </Link>
          </div>
          <div className="footer_splitter"></div>
          <div className="login_footer_wrap">
            <Link to="/">Sign Up</Link>
            <Link to="/">Log in</Link>
            <Link to="/">Messenger</Link>
            <Link to="/">Facebook Lite</Link>
            <Link to="/">Watch</Link>
            <Link to="/">Places</Link>
            <Link to="/">Games</Link>
            <Link to="/">Marketplace</Link>
            <Link to="/">Facebook Pay</Link>
            <Link to="/">Oculus</Link>
            <Link to="/">Portal</Link>
            <Link to="/">Instagram</Link>
            <Link to="/">Bulletin</Link>
            <Link to="/">Local</Link>
            <Link to="/">Fundraisers</Link>
            <Link to="/">Services</Link>
            <Link to="/">Voting Information Centre</Link>
            <Link to="/">Groups</Link>
            <Link to="/">About</Link>
            <Link to="/">Create ad</Link>
            <Link to="/">Create Page</Link>
            <Link to="/">Developers</Link>
            <Link to="/">Careers</Link>
            <Link to="/">Privacy</Link>
            <Link to="/">Cookies</Link>
            <Link to="/">
              AdChoices
              <i className="adChoices_icon"></i>
            </Link>
            <Link to="/">Terms</Link>
            <Link to="/">Help</Link>
          </div>
          <div className="login_footer_wrap">
            <Link to="/" style={{ fontSize: "12px", marginTop: "10px" }}>
              Meta © 2022
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
