import { Form, Formik } from 'formik';
import { useState } from 'react';
import RegisterInput from '../inputs/registerinput';
import * as Yup from 'yup';
import DateOfBirthSelect from './DateOfBirthSelect';
import GenderSelect from './GenderSelect';
import PuffLoader from 'react-spinners/PuffLoader';
import axios from 'axios';

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

  //---------------------🔴Use states------------------------------
  const [dateError, setDateError] = useState();
  const [genderError, setGenderError] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  // fetch data using Axios and destructure data
  const registerSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        {
          first_name,
          last_name,
          email,
          password,
          bYear,
          bMonth,
          bDay,
          gender,
        }
      );
      setError('')
      setSuccess(data.message)
    } catch (error) {
      setLoading(false);
      setSuccess('');
      setError(error.response.data.message);
      //  get error response from backend

    }
  };
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
              setDateError('Must be 14');
            } else if (gender === '') {
              setDateError('');
              setGenderError('age');
            } else {
              setDateError('');
              setGenderError('');
              registerSubmit();
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
                <DateOfBirthSelect
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  years={years}
                  months={months}
                  days={days}
                  dateError={dateError}
                  handleRegisterChange={handleRegisterChange}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Gender <i className="info_icon"></i>
                </div>
                <GenderSelect
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  years={years}
                  months={months}
                  days={days}
                  genderError={genderError}
                  handleRegisterChange={handleRegisterChange}
                />
              </div>
              <div className="reg_infos">
                By clicking Sign Up, you agree to our{' '}
                <span> Terms, Data Policy &nbsp;</span>and
                <span> Cookies Policy.</span>
                You may receive SMS Notifications from us and can opt out any
                time.
              </div>
              <div className="reg_btn_wrapper">
                <button type='submit'className="blue_btn open_signup">Sign up</button>
              </div>

              <PuffLoader color="#1876f2" loading={loading} size={39} />
              {error && <div className="error_text">{error}</div>}
              {success && <div className="success_text">{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
