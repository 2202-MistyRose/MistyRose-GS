import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/auth.slice";

const Navbar = () => {
  const { success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>FS-App-Template</h1>
      <nav>
        {success ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/products">Products</Link>
            <a href="#" onClick={() => dispatch(logout())}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
/**
 * CONTAINER
 */
