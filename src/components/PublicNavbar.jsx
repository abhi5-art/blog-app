import { NavLink } from "react-router-dom"
const PublicNavbar = () => {
    return (
       <nav className="primary-link">
          <NavLink to="signup">Signup</NavLink>
          <NavLink to="login">Login</NavLink>
        </nav>
    )
};

export default PublicNavbar;