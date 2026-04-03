import { FiMenu, FiSearch, FiMic } from "react-icons/fi";
import { FaYoutube } from "react-icons/fa";
import { MdVideoCall, MdNotificationsNone } from "react-icons/md";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">

      {/* LEFT */}
      <div className="nav-left">
        <FiMenu className="icon" />
        <FaYoutube className="logo" />
        <span className="logo-text">YouTube</span>
      </div>

      {/* CENTER */}
      <div className="nav-center">
        <div className="search-box">
          <input type="text" placeholder="Search" />
          <button><FiSearch /></button>
        </div>
        <FiMic className="icon mic" />
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        <MdVideoCall className="icon" />
        <MdNotificationsNone className="icon" />
        <div className="avatar"></div>
      </div>

    </div>
  );
}

export default Navbar;
