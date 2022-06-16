import './style.css';
import { useField } from 'formik';
export default function LoginInput({ placeholder, ...props }) {
  // make sure is []
  const [ field, meta ] = useField(props);
  return (
    <div className="input_wrap">
      {/* pass in placeholder from login/index.js */}
      <input type={field.type} name = {field.name}placeholder={placeholder} {...field} {...props} />
    </div>
  );
}
