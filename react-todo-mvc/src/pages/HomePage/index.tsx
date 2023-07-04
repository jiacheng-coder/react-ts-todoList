import { NavLink } from "react-router-dom";
import "./index.css"

export default function HomePage() {
  return (
    <>
      <nav className="homepage-nav">
        <NavLink to="normal">普通版</NavLink>
        <NavLink to="context">普通+useContext版</NavLink>
        <NavLink to="roo">Roo版</NavLink>
        <NavLink to="detail">新建待办</NavLink>
      </nav>
    </>
  );
}
