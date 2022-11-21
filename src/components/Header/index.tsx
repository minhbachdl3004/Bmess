import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import Logo from "../../assets/images/whatsapp.png";

interface Username {
  isLogin: boolean;
  username: String;
}

const Header = ({ username, isLogin }: Username) => {
  const headerRef = useRef<any>(null);

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 60 ||
        document.documentElement.scrollTop > 60
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);
  return (
    <nav ref={headerRef} className="nav">
      <div className="container">
        <div className="logo">
          <Link to="/">BMess</Link>
          <img
            style={{ width: 30, height: 30, marginTop: 10 }}
            src={Logo}
            alt=""
          />
        </div>
        <div id="mainListDiv" className="main_list">
          <ul className="navlinks">
            <li>
              <Link to="/login">Log In</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Log Out</Link>
            </li>
          </ul>
        </div>
        <span className="navTrigger">
          <i></i>
          <i></i>
          <i></i>
        </span>
      </div>
    </nav>
  );
};

export default Header;
