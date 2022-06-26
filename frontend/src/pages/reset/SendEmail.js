import axios from "axios";
import { Link } from "react-router-dom";

export default function SendEmail({
  userInfos,
  email,
  error,
  setError,
  setVisible,
  setUserInfos,
  loading,
  setLoading,
  user
}) {

  return (
    <div className="reset_form dynamic_height">
      <div className="reset_form_header">Reset Your Password</div>
      <div className="reset_grid">
        <div className="reset_left">
          <div className="reset_form_text">
            How do you want to receive the code to reset your password?
          </div>
          <label htmlFor="email" className="hover1">
            <input type="radio" name="" id="email" checked readOnly />
            <div className="label_col">
              <span>Send code to email</span>
              <span></span>
            </div>
          </label>
        </div>
        <div className="reset_right">
          <img src={user.picture} alt="" />
          <span></span>
          <span>Facebook user</span>
        </div>
      </div>
      {error && (
        <div className="error_text" style={{ padding: '10px' }}>
          {error}
           </div>
      )}
      <div className="reset_form_btns">
        <Link to="/login" className="gray_btn">
          Not You ?
        </Link>
        <button
          // onClick={() => {
          //   sendEmail();
          // }}
          className="blue_btn"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
