import './style.css';
import { ErrorMessage, useField } from 'formik';
export default function LoginInput({ placeholder, ...props }) {
  // make sure is []
  const [field, meta] = useField(props);
  return (
    <div className="input_wrap">
      {/* error box  */}
      <div className="input_error"> 
        {/* change message from yup input  in index.js */}
        {meta.touched && meta.error && <ErrorMessage name={field.name} />}
      </div>
      {/* pass in placeholder from login/index.js */}
      <input
        // 🔴 Change input border style
        className={meta.touched && meta.error ? 'input_error_border':''}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && <i className="info_icon"></i>}
    </div>
  );
}
