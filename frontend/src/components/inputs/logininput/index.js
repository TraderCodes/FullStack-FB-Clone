import "./style.css"
export default function LoginInput
({placeholder}) {
  return (
    <div className="input_wrap">
      {/* pass in placeholder from login/index.js */}
      <input type="text" placeholder={placeholder} />
    </div>
  );
}
