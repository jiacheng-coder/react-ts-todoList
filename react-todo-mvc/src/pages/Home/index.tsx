import { Link, NavLink } from "react-router-dom";
import { editTypeEnum } from "../../utils/enum";
export default function HomePage() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="normal">普通版</NavLink>
          </li>
        </ul>
        <li>
          <NavLink to="context">普通+useContext版</NavLink>
        </li>
        <li>
          <NavLink to="roo/table">Roo版</NavLink>
        </li>
      </nav>
    </>
  );
}
