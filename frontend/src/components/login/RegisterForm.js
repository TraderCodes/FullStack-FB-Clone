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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
