import "./Navbar.css";
import { useContext } from "react";
import { WebSocketContext } from "../../context/WebSocketProvider"; 
import Logo from "../../assets/images/yamaha-logo.svg";

const Navbar = () => {
  const { botStatus } = useContext(WebSocketContext);
  return (
    <>
      <nav className="navbar-container">
        <span>
          <img src={Logo} alt="yamaha-logo" className="yamaha-logo" />
        </span>
        <h1 className="navbar-text">Person Follower Bot</h1>
        <h1 className={botStatus}>
        • {botStatus.charAt(0).toUpperCase() + botStatus.slice(1)}
      </h1>
      </nav>
    </>
  );
};
export default Navbar;
