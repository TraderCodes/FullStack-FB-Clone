import { Link } from 'react-router-dom';
import { useState } from 'react';
import SettingsPrivacy from './SettingsPrivacy'
export default function UserMenu({ user }) {
  const [visible, setVisible] = useState(0);
  return (
    <div className="mmenu">
      {visible === 0 && (
        <div>
          <Link to="profile" className="mmenu_header hover3">
            <img src={user?.picture} alt="k" />
            <div className="mmenu_col">
              <span>
                {user?.first_name}
                {user?.last_name}
              </span>
              <span>Click to see your profile</span>
            </div>
          </Link>
          {/* split */}
          <div className="mmenu_splitter"></div>
          <div className="mmenu_main hover3">
            <div className="small_circle">
              <i className="report_filled_icon"></i>
            </div>
            <div mmenu_col>
              <div className="mmenu_span1">Feedback</div>
              <div className="mmenu_span2">Help us improve facebook</div>
            </div>
          </div>
          {/* split */}
          <div className="mmenu_splitter"></div>
          <div className="mmenu_item hover3">
            <div className="small_circle">
              <i className="settings_filled_icon"></i>
            </div>
            <span>Setting & privacy</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          <div className="mmenu_item hover3">
            <div className="small_circle">
              <i className="help_filled_icon"></i>
            </div>
            <span>Support & Help</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          <div className="mmenu_item hover3">
            <div className="small_circle">
              <i className="dark_filled_icon"></i>
            </div>
            <span>Accessibility & Display </span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          <div className="mmenu_item hover3">
            <div className="small_circle">
              <i className="logout_filled_icon"></i>
            </div>
            <span> Log Out</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
        </div>
      )}
      {visible===1 && <SettingsPrivacy /> }
    </div>
  );
}