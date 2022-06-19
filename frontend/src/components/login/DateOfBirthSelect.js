import { useMediaQuery } from "react-responsive";


export default function DateOfBirthSelect({
  bDay,
  bMonth,
  bYear,
  days,
  years,
  months,
  handleRegisterChange,
  dateError
})

{
   const view1 = useMediaQuery({
     query: '(min-width:550px)',
   });
   const view2 = useMediaQuery({
     query: '(min-width:650px)',
   });
   const view3 = useMediaQuery({
     query: '(min-width:1179px)',
   });

  return (
    <div className="reg_grid" style={{marginBottom:`${dateError && !view3 && "45px"}`}}>
      <select name="bDay" value={bDay} onChange={handleRegisterChange}>
        {days.map((day, i) => (
          <option value={day} key={i}>
            {day}
          </option>
        ))}
      </select>
      <select name="bMonth" value={bMonth} onChange={handleRegisterChange}>
        {months.map((month, i) => (
          <option value={month} key={i}>
            {month}
          </option>
        ))}
      </select>
      <select name="bYear" value={bYear} onChange={handleRegisterChange}>
        {years.map((year, i) => (
          <option value={year} key={i}>
            {year}
          </option>
        ))}
      </select>
      {dateError &&( <div className="input_error">
        <div className='error_arrow_bottom'> </div>
        {dateError}</div>)}
    </div>
  );
}

