import { FiHome, FiPlay, FiUser } from "react-icons/fi";
import { MdOutlineSubscriptions } from "react-icons/md";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <div className="sidebar-item active">
        <FiHome />
        <span>Home</span>
      </div>

      <div className="sidebar-item">
        <FiPlay />
        <span>Shorts</span>
      </div>

      <div className="sidebar-item">
        <MdOutlineSubscriptions />
        <span>Subscriptions</span>
      </div>

      <div className="sidebar-item">
        <FiUser />
        <span>Account</span>
      </div>

    </div>
  );
}

export default Sidebar;
