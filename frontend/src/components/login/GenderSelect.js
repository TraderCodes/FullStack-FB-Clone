export default function GenderSelect({
  bDay,
  bMonth,
  bYear,
  days,
  years,
  months,
  handleRegisterChange,
  genderError,
}) {
  return (
    <div className="reg_grid">
      <label htmlFor="male">
        Male
        <input
          type="radio"
          name="gender"
          id="male"
          value="male"
          onChange={handleRegisterChange}
        />
      </label>
      <label htmlFor="female">
        Female
        <input
          type="radio"
          name="gender"
          id="female"
          value="female"
          onChange={handleRegisterChange}
        />
      </label>
      <label htmlFor="I decide">
        I Decide
        <input
          type="radio"
          name="gender"
          id="custom"
          value="custom"
          onChange={handleRegisterChange}
        />
      </label>
      {genderError && (
        <div className="input_error">
          <div className="error_arrow_bottom"> </div>
          {genderError}
        </div>
      )}
    </div>
  );
}
