import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import {NavigationBar} from 'components'
import {full_width, main_container} from 'sharedStyle/sharedStyle.scss'

class MainContainer extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className = {full_width}>
                <NavigationBar flag= {true}/>
                <div className= {main_container}>
                    {this.props.children }
                </div>
            </div>
        );
    }
}

export default MainContainer;
