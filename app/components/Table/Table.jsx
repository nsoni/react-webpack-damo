import React from 'react';
import * as style from './style.scss'
import { full_width, error, max_margin_top, theme_color} from 'sharedStyle/sharedStyle.scss'

function showData(currentAgentList){
	return currentAgentList.map((row, index) => {
	  let td = []

	  for (const data in row) {
	    td.push(<td key={data}>{row[data]}</td>)
	  }

	  return (
	    <tr key={index}>
	      {td}
	    </tr>
	  )
	})
}

function createHeader(headers) {
  return headers.map((header, index) => <th key={index} >
  																				{header}
  																			</th>)
}

export default function Table ({currentAgentList, headers}){
		return (
			<div>
				<table className = {style.table_view}>
					<thead>
		        <tr>
		          {createHeader(headers)}
		        </tr>
		      </thead>
	      <tbody>
	        {currentAgentList && currentAgentList.length ? showData(currentAgentList) : ""}
	      </tbody>
				</table>
				{currentAgentList && currentAgentList.length ? "" : <div className = {full_width +" "+ max_margin_top +" "+ error}>No info Available!</div>}
			</div>
		);
}
