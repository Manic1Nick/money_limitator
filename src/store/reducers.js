import C from '../constants'
import { combineReducers } from 'redux'

import { getLastDate } from '../util/DateUtil'
import { calcSumm, formatListSumms } from '../util/CalcUtil'
import { calcLimitBase, calcLimitCorrected, calcLimitFact } from '../util/LimitsUtil'

export const period = (state={}, action) => {
	return state
}

export const incomes = (state={}, action) => {

	let newState = Object.assign({}, state)

	switch(action.type) {
		case C.ADD_INCOME:
			newState[action.payload.date] = action.payload.summ
			return newState

		case C.DELETE_INCOME:
			delete newState[action.payload.date]
			return newState

		default:
			return state
	}
}

export const expenses = (state={}, action) => {

	let newState = Object.assign({}, state)

	switch(action.type) {
		case C.ADD_EXPENSE:
			newState[action.payload.date] = action.payload.summ
			return newState

		case C.DELETE_EXPENSE:
			delete newState[action.payload.date]
			return newState

		case C.FILL_GAPS:
			if (Object.keys(newState).length > 0) {
				newState = formatListSumms(newState)
			}
			return newState

		default:
			return state
	}
}

export const notIncluded = (state={}, action) => {

	let newState = Object.assign({}, state)

	switch(action.type) {
		case C.ADD_NOT_INCLUDED:
			newState[action.payload.date] = action.payload.summ
			return newState

		case C.DELETE_NOT_INCLUDED:
			delete newState[action.payload.date]
			return newState

		default:
			return state
	}
}

export const summs = (state={}, action) => {

	let newState = Object.assign({}, state)

	switch(action.type) {
		case C.UPDATE_SUMMS:
			newState.summIncomes = calcSumm(action.payload.incomes)
			newState.summExpenses = calcSumm(action.payload.expenses)
			newState.summNotIncluded = calcSumm(action.payload.notIncluded)

		default:
			return newState
	}
}

export const limits = (state={}, action) => {

	let newState = Object.assign({}, state)

	switch(action.type) {
		case C.UPDATE_LIMITS:
			const { period, expenses, summs } = action.payload

			let lastDateWithExpense = getLastDate(expenses)

			newState.base = calcLimitBase(period, summs)
			newState.corrected = calcLimitCorrected(period, lastDateWithExpense, summs)
			newState.fact = calcLimitFact(period, lastDateWithExpense, summs)

		default:
			return newState
	}
}

export const notifications = (state={}, action) => {

	switch(action.type) {
		case C.SHOW_NOTIFICATION:
			return { 
				show: true,
				message: action.payload 
			}

		case C.HIDE_NOTIFICATION:
			return {
				show: false,
				message: ''
			}
		
		default:
			return state
	}

}

export const errors = (state=[], action) => {

	switch (action.type) {
		case C.ADD_ERROR:
			return [].concat(state, action.payload)	
			//return [ ..state, action.payload ]

		case C.CLEAR_ERROR:
			return state.filter((message, i) => i !== action.payload)

		case C.CLEAR_ALL_ERRORS:
			return []

		default:
			return state
	}	
}

export default combineReducers({
	period,
	incomes,
	expenses,
	notIncluded,
	summs,
	limits,
	notifications,
	errors
})