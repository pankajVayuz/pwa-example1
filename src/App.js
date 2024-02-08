import logo from "./logo.svg";
import "./App.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import Users from "./component/Users";
import About from "./component/About";
import GetLocation from "./component/GetLocation";
import { useEffect, useState } from "react";

function App() {
  const [mode, setMode] = useState("online");

  useEffect(() => {
    const isOnline = navigator.onLine;
    if (isOnline) {
     
    } else {
     
      setMode("offline");
    }
  }, [])
  
  return (
    <div className="App">
     
        <Navbar bg="primary" data-bs-theme="dark">
          <Container>
            <Navbar.Brand>Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link>
                <Link to={"/"}>Home</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to={"/users"}>Users</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to={"/about"}>About us</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to={"/location"}>Get Location</Link>
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <div>
        {mode === "offline" ? <h1>You are offline</h1> : <h1>You are online</h1>}
      </div>
        <Routes>
          <Route Component={About} path="/about"></Route>
          <Route Component={Users} path="/users"></Route> 
          <Route Component={Home} path="/"></Route>
          <Route Component={GetLocation} path="/location"></Route>
        </Routes>

      
     
    </div>
  );
}

export default App;
