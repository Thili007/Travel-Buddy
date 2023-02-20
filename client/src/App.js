import "./App.css";
import Navbar from "./components/Navbar";
import PostCard from "./components/PostCard";
import Profile from "./Pages/Profile";

function App() {
  return (
    <div className="App">
      <Navbar />
      <PostCard />
      <Profile />
    </div>
  );
}

export default App;
