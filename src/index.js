import React from 'react'
import { render } from 'react-dom'
import beginState from './initialState'
import storeFactory from './store'
import { Provider } from 'react-redux'
import MainPage from './components'
import { addError, activateApp, screenResize } from './actions'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './assets/styles/style.scss'
import './assets/styles/queries.scss'

const appState = localStorage["store-money-limitator"],
	initialState = appState ? JSON.parse(appState) : beginState	

initialState.screenSize = typeof window === 'object' ? getTypeScreen() : null

const saveState = () => 
	localStorage["store-money-limitator"] = JSON.stringify(store.getState())

const handleError = error =>
	store.dispatch(addError(error.message))

const handleResize = () => {
	let currentScreenSize = getTypeScreen()
	if (store.getState().screenSize !== currentScreenSize) {
		store.dispatch(screenResize(currentScreenSize))
	}
}

function getTypeScreen() {
	let width = window.innerWidth
	return width < 480 ? 'XS' : width < 768 ? 'S' : 'M'
}

const store = storeFactory(initialState)
store.dispatch(activateApp())
store.subscribe(saveState)

window.React = React
window.store = store

window.addEventListener("error", handleError)
window.addEventListener("resize", handleResize)

render(
	<Provider store={store}>
		<MuiThemeProvider>
			<MainPage />
		</MuiThemeProvider>
	</Provider>,
  	document.getElementById('react-container')
)