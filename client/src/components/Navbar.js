import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap/'

export default function navbar() {
    return (
        <div><Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Apk</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/applications">Applications</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar></div>
    )
}
