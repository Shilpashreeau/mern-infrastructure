import { useState } from "react";
import {Routes, Route} from "react-router-dom";
 import NewOrderPage from "./pages/NewOrderPage";
import AuthPage from "./pages/AuthPage";
import OrderHistoryPage from './pages/OrderHistoryPage';
import NavBar from "./components/NavBar";

import { getUser } from "./utilities/users-service";
import "./App.css";

function App() {
  // const [user, setUser] = useState({});//when user is logged in
  const [user, setUser] = useState(getUser());  //Or we can use empty string “ ” here empty object to make truthy value for the if condition
    //if the user logged in provide different routes or else take to Authpage
  return (<main className="App">
  
    {user ? 
    <>
    <NavBar user= {user} setUser={setUser}/>
    <Routes>
      <Route path="/orders/new" element={<NewOrderPage/>}/>
      <Route path="/orders" element={<OrderHistoryPage/>}/>
    </Routes>
    </>
  : 
  <AuthPage setUser={setUser}/>}
  </main>
  );
}

export default App;
