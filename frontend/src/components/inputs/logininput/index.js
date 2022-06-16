import './style.css';
import { ErrorMessage, useField } from 'formik';
// (bottom) only added to Password
export default function LoginInput({ placeholder, bottom, ...props }) {
  // make sure is []
  const [field, meta] = useField(props);
  return (
    <div className="input_wrap">
      {/* error box  */}
      {meta.touched && meta.error && !bottom && (
        <div className="input_error" style={{ transform: 'translateY(-6px)' }}>
          {/* change message from yup input  in index.js */}
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div className="error_arrow_top"></div>
          )}
        </div>
      )}
      {/* pass in placeholder from login/index.js */}
      <input
        // 🔴 Change input border style
        className={meta.touched && meta.error ? 'input_error_border' : ''}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && bottom && (
        <div className="input_error">
          {/* change message from yup input  in index.js */}
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div className="error_arrow_bottom"></div>
          )}
        </div>
      )}
      {meta.touched && meta.error && (
        <i className="info_icon" style={{ top: `${!bottom && '62%'}` }}></i>
      )}
    </div>
  );
}
