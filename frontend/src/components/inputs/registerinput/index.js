import './style.css';
import { ErrorMessage, useField } from 'formik';
import { useMediaQuery } from 'react-responsive';
// (bottom) only added to Password
export default function RegisterInput({ placeholder, bottom, ...props }) {
  // make sure is []
  const [field, meta] = useField(props);
  const desktopView = useMediaQuery({
    query: '(min-width:850px)',
  });
  return (
    <div className="input_wrap register_input_wrap" >

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
      {meta.touched && meta.error && (
        <div
          className={
            desktopView ? 'input_error input_error_desktop' : 'input_error'
          }
        >
          {/* change message from yup input  in index.js */}
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={
                desktopView ? 'error_arrow_left' : 'error_arrow_bottom'
              }
            ></div>
          )}
        </div>
      )}
      {meta.touched && meta.error && (
        <i
          className="info_icon"
        ></i>
      )}
    </div>
  );
}
