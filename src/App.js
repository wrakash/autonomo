import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LockPage from "./pages/LockPage";
import ProtectedPage from "./ProtectedPage";
import HeartBeat from "./pages/HeartBeat";
import UserCart from "./pages/UserCart";
import Measurement from "./pages/Measurement";


function App() {
  return (
    <>
      <Router>
        <Route exact path="/lock">
          <LockPage />
        </Route>

        <Route exact path="/machine/measurement">
         
          <ProtectedPage cmp={Measurement} />
        </Route>

        <Route exact path="/machine/user/cart">
          <ProtectedPage cmp={UserCart} />
        </Route>


        <Route exact path="/">
          <ProtectedPage cmp={HeartBeat} />
        </Route>
      </Router>
    </>
  );
}

export default App;
