import React from 'react'
import { Router, Route, hashHistory, IndexRoute, browserHistory, useRouterHistory } from 'react-router'
import { 
				MainContainer,
				AgentInfoContainer,
				SyntexCheckerContainer,
	} from 'containers'

export default function getRoutes (checkAuth) {
	return (
		<Router onUpdate={() => window.scrollTo(0, 0)} history={ hashHistory }>
			<Route path='/' component={MainContainer} >
				<IndexRoute component = {AgentInfoContainer}/>
				<Route path="agent_info" component = {AgentInfoContainer} />
				<Route path="syntex_checkr" component = {SyntexCheckerContainer} />
			</Route>	
		</Router>
		)
}

