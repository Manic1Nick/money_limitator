import keyMirror from 'key-mirror'

export default keyMirror({	
	ADD_PERIOD			: null,
	CHANGE_PERIOD		: null,
	DELETE_PERIOD		: null,

	ADD_INCOME			: null,
	DELETE_INCOME		: null,

	ADD_EXPENSE			: null,
	DELETE_EXPENSE		: null,

	ADD_NOT_INCLUDED	: null,
	DELETE_NOT_INCLUDED	: null,

	FILL_GAPS			: null,
	UPDATE_SUMMS		: null,
	UPDATE_LIMITS		: null,

	SHOW_NOTIFICATION	: null,
	HIDE_NOTIFICATION	: null,

	ADD_ERROR			: null,
	CLEAR_ERROR 		: null,
	CLEAR_ALL_ERRORS 	: null
})

export const COLORS_LIMITS = {
	base: '#00BFFF',
	corrected: '#9932CC',
	fact: '#FF6347'
}

export const COLORS_CHART = {
	expense: '#9ACD32',
	expenseActive: '#7ba428'
}

export const COLORS_BALANCE = {
	money: '#00C49F', 
	days: '#FF8042'
}

export const COLORS_ICONS = {
	save: '#00BFFF',
	clear: '#A9A9A9',
	delete: '#FF6347',
	addNewSumm: '#A9A9A9'
}