export default function MenuItem({ icon, title, subtitle, img }) {
  return (


    // added a function where it only show certain menu list to their own post
    <li className="hover1">
      {img ? <img src={img} alt="" /> : <i className={icon}></i>}
      <div className="post_menu_text">
        <span>{title}</span>
        {subtitle && <span className="menu_post_col filter1">{subtitle}</span>}
      </div>
    </li>
  );
}
