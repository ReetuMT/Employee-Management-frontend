import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AddEmployee from "./Component/add-emp";
import { Viewemployee } from "./Component/view-emp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="add-emp" element={<AddEmployee />} />
        <Route path="view-emp" element={<Viewemployee />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
