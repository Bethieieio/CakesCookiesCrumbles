import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import BootstrapNavbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from './context/CurrentUserContext';

export const Navbar = () => {
    const navigate = useNavigate()
    const currentUser = useCurrentUser()
    
    return(
    <BootstrapNavbar expand="lg" className="bg-body-tertiary">
        <Container>
            <BootstrapNavbar.Brand href="#home">React-Bootstrap</BootstrapNavbar.Brand>
            <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
            <BootstrapNavbar.Collapse id="basic-navbar-nav" className='justify-content-end'>

                {!currentUser?(<Nav className="justify-content-end">
                    <Nav.Link onClick={() => {navigate('/signup')}}> Sign Up </Nav.Link>
                    <Nav.Link onClick={() => {navigate('/login')}}> Log In </Nav.Link>
                </Nav>)
                :
                (<Nav className="justify-content-end">
                <Nav.Link onClick={() => {navigate('/Create Recipe')}}> Create Recipe </Nav.Link>
                <Nav.Link onClick={() => {navigate('/Sign Out')}}> Sign Out </Nav.Link>
            </Nav>)}

            </BootstrapNavbar.Collapse>
        </Container>
    </BootstrapNavbar>
    )
}