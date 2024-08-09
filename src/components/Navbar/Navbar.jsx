import "./Navbar.css";
import { useContext } from "react";
import { WebSocketContext } from "../../context/WebSocketProvider"; // Import the context

import Logo from "../../assets/images/yamaha-logo.svg";
const Navbar = () => {
  const { isConnected } = useContext(WebSocketContext);
  return (
    <>
      <header className="navbar-container">
        <span>
          <img src={Logo} alt="yamaha-logo" className="yamaha-logo" />
        </span>
        <span className="navbar-text">Person Follower</span>
        <span className={isConnected ? "connected" : "disconnected"}>
        • {isConnected ? "Connected" : "Disconnected"}
      </span>
      </header>
    </>
  );
};
export default Navbar;
