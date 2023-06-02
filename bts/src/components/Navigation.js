import React,{Component} from "react";
import { NavLink } from "react-router-dom";
import {Navbar, Nav} from 'react-bootstrap';



export class Navigation extends Component
{
    render()
    {
        return(
            <Navbar bg="primary" expand="lg" >
                <Navbar.Toggle aria-controls="basic-navbar-nav"  />
                <Navbar.Collapse id="basic-navbar-naw">    
                <Nav>
                    <NavLink className="d-inline p-2 bg-primary text-white"
                    to="/">Home</NavLink>
                    <NavLink className="d-inline p-2 bg-primary text-white"
                    to="/department">Department</NavLink>
                    <NavLink className="d-inline p-2 bg-primary text-white"
                    to="/employee">Employee</NavLink>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}