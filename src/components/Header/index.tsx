import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import Logo from "../../assets/images/whatsapp.png";
import useUserStore from "../../store/userStore";
import AccountMenu from "../common/profile";
import { padding } from "@mui/system";

const Header = () => {
  const loadFromToken = useUserStore((state) => state.loadFromToken);
  const token = useUserStore((state) => state.user);
  const logout = useUserStore((store) => store.logout);

  useEffect(() => {
    loadFromToken();
  }, []);
  console.log(token);

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

  const handleLogout = () => {
    logout();
  };
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
            {token ? (
              <>
                <div
                  style={{
                    width: 100,
                    height: "auto",
                    padding: 10,
                  }}
                >
                  <AccountMenu
                    username={token?.username}
                    onClick={handleLogout}
                  />
                </div>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Log In</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
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
