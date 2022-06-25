import './style.css';
import HashLoader from 'react-spinners/HashLoader';
export default function ActivateForm({ type, header, text, isLoading }) {
  return (
    <div className="blur">
      <div className="popup">
        <div
          className={`popup_header ${
            type === 'success' ? 'success_text' : 'error_text'
          }`}
        >
          {header}
        </div>
        <div className="popup_message">{text}</div>
        {/* Add dotloader */}
        <HashLoader color="#1876f2" size={49} loading={isLoading} />
      </div>
    </div>
  );
}
