import React, {useState} from 'react';
import { Navbar, NavbarBrand, NavItem, Nav, NavbarToggler, Collapse } from 'reactstrap';
import { NavLink } from 'react-router-dom';
function HeaderComponent(props) {
    const [isNavOpen, toggleNavbar] = useState(false);
    
    return (
        <div>
            
            <React.Fragment>
                    <div>
                        <Navbar className="headers" dark fixed="top" expand="md">
                            <div className="container nav justify-content-center">
                                <NavbarBrand className="mr-auto" href="/"><img src="assets/logop.jpeg" width="80px"></img><span className="h-title">  THE TUITION</span></NavbarBrand>
                                <NavbarToggler className="ml-auto" onClick={()=> toggleNavbar(!isNavOpen)} />
                                <Collapse isOpen={isNavOpen} navbar>
                                    <Nav className="m-auto" navbar>
                                        <NavItem active><NavLink className="nav-link" to="/">HOME</NavLink></NavItem>
                                        <NavItem><NavLink className="nav-link" to="/1">COURSES</NavLink></NavItem>
                                        <NavItem><NavLink className="nav-link" to="/2">E-RESOURCES</NavLink></NavItem>
                                        <NavItem><NavLink className="nav-link" to="/3">NEWS</NavLink></NavItem>
                                        <NavItem><NavLink className="nav-link" to="/4">CONTACT</NavLink></NavItem>
                                    </Nav>
                                </Collapse>
                                <button className="h-apply ml-sm-auto">APPLY NOW</button>
                            </div>
                        </Navbar>
                    </div>
            </React.Fragment>
        </div>
    );
}

export default HeaderComponent;