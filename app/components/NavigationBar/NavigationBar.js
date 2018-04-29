import React from 'react';
import { Link } from 'react-router'
import { full_width } from 'sharedStyle/sharedStyle.scss'
import * as style from './style.scss'

export default function NavigationBar ({flag}) {
		return (
			<div className = {style.navContainer +" "+ full_width}>
				<ul>
          <li>
            <Link to='/agent_info'>Agent Info</Link>
          </li>
          <li>
            <Link to='/syntex_checkr'>Syntex Checker</Link>
          </li>
        </ul>
			</div>
		);
}
