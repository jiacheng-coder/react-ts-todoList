import { NavLink } from "react-router-dom";
export default function HomePage() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="normal">Normal 版</NavLink>
          </li>
        </ul>
        <li>
          <NavLink to="context">useContext 版</NavLink>
        </li>
        <li>
          <NavLink to="roo/table">Roo 版</NavLink>
        </li>
        <li>
          <NavLink to="formily">Formily 学习</NavLink>
        </li>
      </nav>
    </>
  );
}
