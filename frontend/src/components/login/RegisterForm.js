import { Form, Formik } from 'formik';
import { useState } from 'react';
import RegisterInput from '../inputs/registerinput';
import * as Yup from 'yup';
const userInfos = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  bYear: new Date().getFullYear(),
  bMonth: new Date().getMonth() + 1,
  bDay: new Date().getDate(),
  gender: '',
};
export default function RegisterForm() {
  const [user, setUser] = useState(userInfos);
  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  // Generate Numbers for data or birth Value
  const yearCurrent = new Date().getFullYear();
  const years = Array.from(new Array(108), (val, index) => yearCurrent - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);
  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required('Whats your first name ?')
      .min(2, 'Need 2 to 16 characters'),
    // .matches(/^[aA-zZ]+$/,'Only English letters are allowed')
    last_name: Yup.string()
      .required('Whats your Last name ?')
      .min(2, 'Need 2 to 16 characters'),
    // .matches(/^[aA-zZ]+$/,'Only English letters are allowed')
    email: Yup.string()
      .required('Email please')
      .email('Enter a valid email address'),
    password: Yup.string()

      .required('Password please')
      .min(6, 'Password must be 6 characters long'),
  });
  // console.log(user)
  const [dateError, setDateError] = useState('');
  const [genderError, setGenderError] = useState('');
  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon"></i>
          <span>Sign up</span>
          <span>it's quick and easy</span>
        </div>

        {/*  🔴 Formik */}
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={registerValidation}
          onSubmit={() => {
            let current_date = new Date();
            let picked_date = new Date(bYear, bMonth - 1, bDay);
            // set min age
            let atleast14 = new Date(1970 + 14, 0, 1);
            if (current_date - picked_date < atleast14) {
              setDateError('Needs to be more than 14 years old');
            } else if (gender === '') {
              setGenderError('Please select a valid gender');
            }
          }}
        >
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
                  <select
                    name="bDay"
                    value={bDay}
                    onChange={handleRegisterChange}
                  >
                    {days.map((day, i) => (
                      <option value={day} key={i}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <select
                    name="bMonth"
                    value={bMonth}
                    onChange={handleRegisterChange}
                  >
                    {months.map((month, i) => (
                      <option value={month} key={i}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    name="bYear"
                    value={bYear}
                    onChange={handleRegisterChange}
                  >
                    {years.map((year, i) => (
                      <option value={year} key={i}>
                        {year}
                      </option>
                    ))}
                  </select>
                  {dateError && <div className="input_error">{dateError}</div>}
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
                  {genderError && (
                    <div className="input_error">{genderError}</div>
                  )}
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
                <button className="blue_btn open_signup">Sign up</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
