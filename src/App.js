import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddNote from "./pages/AddNote";
import Notes from "./components/Notes";
import NotePage from "./pages/NotePage";
import EditNote from "./pages/EditNote";

function App() {
  return (
    <div className=" bg-[#FFE5B4]" style={{ minHeight: "100vh" }}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Notes />} />
          <Route path="/add" element={<AddNote />} />
          <Route path="/:id" element={<NotePage />} />
          <Route path="/edit" element={<EditNote />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
