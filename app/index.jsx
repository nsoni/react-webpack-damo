import React from 'react'
import ReactDOM from 'react-dom'
import getRoutes from 'config/routes'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import * as reducers from 'redux/modules'

const store = createStore(
	combineReducers(reducers),
	compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : (f) => f
	)
)

function checkAuth (nextState, replace) {
	
}

ReactDOM.render(
	<Provider store={store}>
		{getRoutes(checkAuth)}
	</Provider>,
document.getElementById('app'))
