import appReducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import C from '../constants'

const consoleMessages = store => next => action => {

	let result

	console.groupCollapsed(`dispatching action => ${action.type}`)
	result = next(action)

	let { 
		incomes, 
		expenses, 
		limits, 
		errors, 
		notifications,
		summs: { summIncomes, summExpenses, summNotIncluded } ,
		screenSize
	} = store.getState()

	console.log(`

		incomes: ${Object.keys(incomes).length}
		expenses: ${Object.keys(expenses).length}
		summs: ${summIncomes} ${summExpenses} ${summNotIncluded}
		limits: ${limits.base} ${limits.corrected} ${limits.fact}
		notifications: ${notifications.show}
		errors: ${errors.length},
		screenSize: ${screenSize}

	`)

	console.groupEnd()

	return result
}

export default (initialState={}) => {
	return createStore(
		appReducer, 
		initialState,
		applyMiddleware(
			reduxThunk, 
			consoleMessages
		)
	)
}
