import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import BootstrapNavbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "./context/CurrentUserContext";
import axios from "axios";

export const Navbar = () => {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const onSignOut = async () => {
    try {
      await axios.post("/logout/");
      setCurrentUser(null);
      navigate("/login/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BootstrapNavbar expand="lg">
      <Container>
        <BootstrapNavbar.Brand
          onClick={() => {
            navigate("/");
          }}
          className="main-title"
        >
          Cakes, Cookies and Crumbles
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-end"
        >
          {!currentUser ? (
            <Nav className="justify-content-end">
              <Nav.Link
                onClick={() => {
                  navigate("/signup");
                }}
              >
                {" "}
                Sign Up{" "}
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/login");
                }}
              >
                {" "}
                Log In{" "}
              </Nav.Link>
            </Nav>
          ) : (
            <Nav className="justify-content-end">
              <Nav.Link
                onClick={() => {
                  navigate("/recipe/create");
                }}
              >
                {" "}
                Create Recipe{" "}
              </Nav.Link>
              <Nav.Link onClick={() => onSignOut()}> Sign Out </Nav.Link>
            </Nav>
          )}
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};
