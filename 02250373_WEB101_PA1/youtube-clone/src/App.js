import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import VideoGrid from "./components/Videos/VideoGrid";
import "./App.css";

function App() {
  return (
    <div>
      <Navbar />

      <div className="main">
        <Sidebar />

        <div className="content">
          <VideoGrid />
        </div>
      </div>
    </div>
  );
}

export default App;
