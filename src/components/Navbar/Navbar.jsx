import "./Navbar.css";
import Logo from '../../assets/images/yamaha-logo.svg'
const Navbar = () => {
  return (<>
        <header className="navbar-container">
            <span>
                <img src={Logo} alt="yamaha-logo" className="yamaha-logo"/>
            </span>
            <span className="navbar-text">Person Follower</span>
        </header>
  </>);
};
export default Navbar;
