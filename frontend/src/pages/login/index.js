// install formail and yup
import './style.css';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
export default function Login() {
  return (
    <div className="login">
      <div className="login_wrapper">
        <div className="login_wrap">
          {/* //login 1 = LOGO🟢  // loging 2 = signup 🟢*/}
          <div className="login_1">
            <img src="../../icons/facebook.svg" alt="" />
            <span>Facebook Text area</span>
          </div>
          <div className="login_2">
            <div className="login_2_wrap">
              <Formik>
                {(Formik) => (
                  <Form>
                    <input type="text" />
                    <input type="text" />
                    <button type="submit" className="blue_btn">
                      Log In
                    </button>
                  </Form>
                )}
              </Formik>
              <Link to="/forgot" className='forgot_password'>Forgot password ?</Link>
              {/* splitter */}
              <div className="sign_splitter"></div>
              <button className="blue_btn open_signup" id='demo'>Demo Login</button>
              <button className="blue_btn open_signup">Create Account</button>
            </div>
            {/* Create a page text */}
            <Link to="/" className="sign_extra">
              <b>Create a page</b> for a celebrity,brand or business
            </Link>
          </div>
        </div>
        <div className="register"> </div>
      </div>
    </div>
  );
}
