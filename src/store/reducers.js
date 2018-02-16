import C from '../constants'
import { combineReducers } from 'redux'

import DateUtil from '../util/DateUtil'
import CalcUtil from '../util/CalcUtil'
import LimitsUtil from '../util/LimitsUtil'

export const period = (state={}, action) => {
	return state
}

export const incomes = (state={}, action) => {

	switch(action.type) {
		case C.ADD_INCOME:
			let data = {}
			data[action.payload.date] = action.payload.summ
			return Object.assign({}, state, data)

		case C.DELETE_INCOME:
			let newState = Object.assign({}, state)
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
			let data = {}
			data[action.payload.date] = action.payload.summ
			return Object.assign({}, state, data)

		case C.DELETE_EXPENSE:
			delete newState[action.payload.date]
			return newState

		case C.FILL_GAPS:
			let expenses = Object.keys(state)

			if (expenses.length > 0) {
				newState = CalcUtil.sortObjectByKeysDates(state)

				let firstDate = action.payload.period.begin,
        			lastDate = CalcUtil.getLastDate(newState),
		        	arrayDates = DateUtil.createArrayDates(firstDate, lastDate)
		
        		arrayDates.forEach(date => {
        			if (!state[date]) newState[date] = 0
        		})				
			}
			return newState

		default:
			return state
	}
}

export const notIncluded = (state={}, action) => {

	switch(action.type) {
		case C.ADD_NOT_INCLUDED:
			let data = {}
			data[action.payload.date] = action.payload.summ
			return Object.assign({}, state, data)

		case C.DELETE_NOT_INCLUDED:
			let newState = Object.assign({}, state)
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
			newState.incomes = CalcUtil.calcSumm(action.payload.incomes)
			newState.expenses = CalcUtil.calcSumm(action.payload.expenses)
			newState.notIncluded = CalcUtil.calcSumm(action.payload.notIncluded)

		default:
			return newState
	}
}

export const limits = (state={}, action) => {

	let newState = Object.assign({}, state)

	switch(action.type) {
		case C.UPDATE_LIMITS:
			const { period, expenses, summs } = action.payload

			let lastDateWithExpense = CalcUtil.getLastDate(expenses)

			newState.base = LimitsUtil.calcLimitBase(period, summs)
			newState.corrected = LimitsUtil.calcLimitCorrected(period, lastDateWithExpense, summs)
			newState.fact = LimitsUtil.calcLimitFact(period, lastDateWithExpense, summs)

		default:
			return newState
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
	errors
})