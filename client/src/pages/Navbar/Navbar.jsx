/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

import Logo from '../../assets/AstreaLogoSite3White.png';

import './Navbar.module.css';

class Navbar extends Component {
    render() {
        return (
            <div className="Navbar">
                <div className="Navbar__Flex">
                    <img  className="Navbar__Logo" src={Logo} alt="Strea Logo" />
                </div>
            </div>
        );
    }
}


export default Navbar;
