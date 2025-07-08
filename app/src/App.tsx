import Login from "./components/Login";
import { Navigate, Route,BrowserRouter as Router,Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Home from "./pages/Home";

const App = () => {
  return (
   <Router>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="*" element={<Navigate to="/"/>}/>
      
    </Routes>
   </Router>
   
  )
}

export default App;