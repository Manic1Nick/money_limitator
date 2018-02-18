import React from 'react'
import { render } from 'react-dom'
import dataState from './initialState'
import storeFactory from './store'
import { Provider } from 'react-redux'
import MainPage from './components'
import { addError, activateApp } from './actions'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './assets/styles/style.scss'

const initialState = (localStorage["store-money-saver"]) 
	? JSON.parse(localStorage["store-money-saver"])
    : dataState

const saveState = () => 
    localStorage["store-money-saver"] = JSON.stringify(store.getState())

const handleError = error => {
	store.dispatch(
		addError(error.message)
	)
}

const store = storeFactory(initialState)
store.subscribe(saveState)
store.dispatch(activateApp())

window.React = React
window.store = store

window.addEventListener("error", handleError)

render(
	<Provider store={store}>
		<MuiThemeProvider>
			<MainPage />
		</MuiThemeProvider>
	</Provider>,
  	document.getElementById('react-container')
)