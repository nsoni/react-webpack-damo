import React from 'react';
import { Link } from 'react-router'
import { full_width, center_container, small_text } from 'sharedStyle/sharedStyle.scss'
import * as style from './style.scss'

export default function GlobalSearchBox ({onChange, value, inputKeyPress, removeSearch}) {
		return (
			<div className = {center_container + " " + style.global_search_container}>
				<input 
          className = {style.global_search} 
          onKeyDown = {inputKeyPress}
          type ="text" 
          value = {value} 
          onChange = {onChange} 
          placeholder = "search from table" 
        />
        <span onClick = {removeSearch} className = {style.search_cancel_button }>
          <span className = {style.cross_text +" "+ full_width}>X</span>
          <span className = {small_text +" "+ full_width}>ESC</span>
        </span>
			</div>
		);
}