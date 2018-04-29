import React from 'react';
import * as style from './style.scss'
import { full_width, center_container, container, button, error, theme_color} from 'sharedStyle/sharedStyle.scss'

export default function SyntexChecker ({handleInputChange, handleSyntexChecker, inputValue, resultMessage, errorIndex, inputKeyPress}){
		let brackets = `"{}()[]"`
		return (
			<div className = {center_container +" "+ style.syntex_checker_container} >
				<div className = {full_width +" "+ style.header} >
					Enter your code below to check if code's brackets {brackets} are balanced :
				</div>

				<div className={full_width +" "+ style.container}>
					<input 
						type="text" 
						value = {inputValue} 
						placeholder = "Type Here" 
						onChange = {handleInputChange} 
						onKeyDown = {inputKeyPress}
						className = {full_width +" "+ style.checker_input}
					/> 
				</div>

				<div className={full_width +" "+ style.container}>
					<button 
						onClick = {handleSyntexChecker} 
						className={full_width +" "+ button}>
							Click Me
					</button>
				</div>

				<div className={full_width +" "+ style.container}>
					{errorIndex  
						?(<div className={full_width +" "+ theme_color}>
								ooHHoo! <span className = {error}>at {errorIndex} place</span> check your string again! <span className = {error}>:(</span> 
							</div>) 
						: (<span className = {theme_color}>{resultMessage} </span>)
					}
				</div>
			</div>
		);
}
