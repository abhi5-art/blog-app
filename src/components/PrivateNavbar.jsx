import { NavLink } from "react-router-dom"
import { toast } from 'react-toastify';

const PrivateNavbar = () => {
    const handlelogout = () => {
       window.localStorage.removeItem("blogData");

       toast.success("Logout succesfull", {
          position :"top-right",
          autoClose : 3000,
      });               
    }

    return (
        <nav className="primary-link">
          <NavLink to="/">Home</NavLink>
          <NavLink to="categories">Categories</NavLink>
          <NavLink to="posts">Posts</NavLink>
          <NavLink to="profile">Profile</NavLink>
          <NavLink to="setting">Setting</NavLink>
          <NavLink to="login" onClick={handlelogout}>Logout</NavLink>
        </nav>
    )
};

export default PrivateNavbar;