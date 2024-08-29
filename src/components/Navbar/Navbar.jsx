import "./Navbar.css";
import { useContext } from "react";
import { WebSocketContext } from "../../context/WebSocketProvider"; 
import Logo from "../../assets/images/yamaha-logo.svg";

const Navbar = () => {
  const { isConnected } = useContext(WebSocketContext);
  return (
    <>
      <nav className="navbar-container">
        <span>
          <img src={Logo} alt="yamaha-logo" className="yamaha-logo" />
        </span>
        <h1 className="navbar-text">Person Follower Bot</h1>
        <h1 className={isConnected ? "connected" : "disconnected"}>
        • {isConnected ? "Connected" : "Disconnected"}
      </h1>
      </nav>
    </>
  );
};
export default Navbar;
