import { Form, Formik } from 'formik';
import { useState } from 'react';
import RegisterInput from '../inputs/registerinput';
const userInfos = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  bYear: '',
  bMonth: '',
  bDay: '',
  gender: '',
};
export default function RegisterForm() {
  const [user, setUser] = useState(userInfos);
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon"></i>
          <span>Sign up</span>
          <span>it's quick and easy</span>
        </div>
        <Formik>
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="First name"
                  name="first_name"
                  onChange={handleRegisterChange}
                />

                <RegisterInput
                  type="text"
                  placeholder="Last name"
                  name="last_name"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  placeholder="Mobile or Email Address"
                  name="email"
                  onChange={handleRegisterChange}
                  type="text"
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  placeholder="New Password"
                  name="password"
                  onChange={handleRegisterChange}
                  type="password"
                />
              </div>
              {/* Date and birth */}
              <div className="reg_col">
                <div className="reg_line_header">
                  Date of birth <i className="info_icon"></i>
                </div>
                <div className="reg_grid">
                  <select name="bDay" id="">
                    <option value="">15</option>
                  </select>
                  <select name="bMonth" id="">
                    <option value="">15</option>
                  </select>
                  <select name="bYear" id="">
                    <option value="">15</option>
                  </select>
                </div>
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Gender <i className="info_icon"></i>
                </div>
                <div className="reg_grid">
                  <label htmlFor="male">
                    Male
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      onChange={handleRegisterChange}
                    />
                  </label>
                  <label htmlFor="female">
                    Female
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      onChange={handleRegisterChange}
                    />
                  </label>
                  <label htmlFor="I decide">
                    I Decide
                    <input
                      type="radio"
                      name="gender"
                      id="custom"
                      value="custom"
                      onChange={handleRegisterChange}
                    />
                  </label>
                </div>
              </div>
              <div className="reg_infos">
                By clicking Sign Up, you agree to our{' '}
                <span> Terms, Data Policy &nbsp;</span>and 
                <span> Cookies Policy.</span>
                You may receive SMS Notifications from us and can opt out any
                time.
              </div>
              <div className="reg_btn_wrapper">
                <button className='blue_btn open_signup'>Sign up</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
