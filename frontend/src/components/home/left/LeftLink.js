export default function LeftLink({ img, text, notificaion }) {
  return (
    <div>
      <img src={`../../../left/${img}.png`} alt="" />
      {notificaion !== undefined ? (
        <div className="col">
          <div className="col_1">{text}</div>

          <div className="col_2">{notificaion}</div>
        </div>
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
}
