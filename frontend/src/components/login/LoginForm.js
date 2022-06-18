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
export default function LoginForm() {
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
    <div className="login_wrap">
      {/* //login 1 = LOGO🟢  // loging 2 = signup 🟢*/}
      <div className="login_1">
        <img src="../../icons/facebook.svg" alt="" />
        <span>
          Facebook Clone Created by <b>TraderCodes</b>
          <br />
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
          <button className="blue_btn open_signup">Create New Account</button>
        </div>
        {/* Create a page text */}
        <Link to="/" className="sign_extra">
          <b>Create a Page</b> for a celebrity, brand or business
        </Link>
      </div>
    </div>
  );
}
