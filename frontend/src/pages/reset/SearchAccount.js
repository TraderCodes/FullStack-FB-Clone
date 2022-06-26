import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik, formik } from 'formik';
import LoginInput from '../../components/inputs/logininput';
import { useState } from 'react';
export default function SearchAccount({ email, setEmail, error }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <div className="reset_form">
      <div className="reset_form_header">Find Your Account</div>
      <div className="reset_form_text">
        Please enter your email address search for your account.
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
              placeholder="Email address "
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
  );
}
