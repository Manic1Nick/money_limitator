import C from './constants'

export const activateApp = () => {
    return (dispatch, getState) => {
        const state = getState()

        if (Object.keys(state.expenses).length > 0
            && state.summs.summExpenses === 0) {

            _updateIndicators(dispatch)
        }
    }
}

export const addNewIncome = income => {
    return (dispatch, getState) => {
        dispatch(addStateToHistory(getState()))

        dispatch({
            type: C.ADD_INCOME,
            payload: income
        })

        let message = `Income of $${income.summ} from ${income.date} was saved succesfully.`
        _updateIndicators(dispatch, message)
    }
}

export const addNewExpense = expense => {
    return (dispatch, getState) => {
        dispatch(addStateToHistory(getState()))
        
        dispatch({
            type: C.ADD_EXPENSE,
            payload: expense
        })
        
        dispatch(fillGaps())

        let message = `Expense of $${expense.summ} from ${expense.date} was saved succesfully.`
        _updateIndicators(dispatch, message)
    }
}

export const addNotIncluded = expense => {
    return (dispatch, getState) => {
        dispatch(addStateToHistory(getState()))
        
        dispatch({
            type: C.ADD_NOT_INCLUDED,
            payload: expense
        })

        let message = `Expense of $${expense.summ} from ${expense.date} was saved succesfully.`
        _updateIndicators(dispatch, message)
    }
}

export const deleteIncome = income => {
    return (dispatch, getState) => {
        dispatch(addStateToHistory(getState()))
        
        dispatch({
            type: C.DELETE_INCOME,
            payload: income
        })

        let message = `Income of $${income.summ} from ${income.date} was deleted succesfully.`
         _updateIndicators(dispatch, message)
    }
}

export const deleteExpense = expense => {
    return (dispatch, getState) => {
        dispatch(addStateToHistory(getState()))
        
        dispatch({
            type: C.DELETE_EXPENSE,
            payload: expense
        })
        
        dispatch(fillGaps())
        
        let message = `Expense of $${expense.summ} from ${expense.date} was deleted succesfully.`
        _updateIndicators(dispatch, message)
    }
}

export const deleteNotIncluded = expense => {
    return (dispatch, getState) => {
        dispatch(addStateToHistory(getState()))
        
        dispatch({
            type: C.DELETE_NOT_INCLUDED,
            payload: expense
        })

        let message = `Expense of $${expense.summ} from ${expense.date} was deleted succesfully.`
        _updateIndicators(message)
    }
}

// historyStates actions
export const addStateToHistory = ({ incomes, expenses, notIncluded }) => ({
    type: C.HISTORY_ADD,
    payload: { incomes, expenses, notIncluded }
})
export const clearHistoryStates = () => ({
    type: C.HISTORY_CLEAR
})

export const undoState = () => {
    return (dispatch, getState) => {
        const { historyStates } = getState(),
            prevState = historyStates.pop()

        dispatch({
            type: C.REPLACE_STATE,
            payload: prevState
        })

        dispatch(fillGaps())
        
        let message = `The last action was canceled successfully.`
        _updateIndicators(dispatch, message)
    }
}

export const undoLastAction = expense => {
    return (dispatch) => {
        dispatch({
            type: C.ADD_EXPENSE,
            payload: expense
        })

        dispatch(fillGaps())
        
        let message = `The last action was canceled successfully.`
        _updateIndicators(dispatch, message)
    }
}

export const fillGaps = () => {
    return (dispatch, getState) => {
        const state = getState()

        dispatch({
            type: C.FILL_GAPS,
            payload: state
        })
    }
}

export const updateSumms = () => {
    return (dispatch, getState) => {
        const state = getState()

        dispatch({
            type: C.UPDATE_SUMMS,
            payload: state
        })
    }
}

export const updateLimits = () => {
    return (dispatch, getState) => {
        const state = getState()

        dispatch({
            type: C.UPDATE_LIMITS,
            payload: state
        })
    }
}

export const showNotification = message => ({
    type: C.SHOW_NOTIFICATION,
    payload: message
})

export const hideNotification = () => ({
    type: C.HIDE_NOTIFICATION
})

export const addError = message => ({
    type: C.ADD_ERROR,
    payload: message
})

export const clearError = index => ({
    type: C.CLEAR_ERROR,
    payload: index
})

export const clearAllErrors = () => ({
    type: C.CLEAR_ALL_ERRORS
})

export const screenResize = size => ({
    type: C.SCREEN_RESIZE,
    screenSize: size
})

function _updateIndicators(dispatch, message) {
    if (message) dispatch(showNotification(message))
    
    dispatch(updateSumms())
    dispatch(updateLimits())
}