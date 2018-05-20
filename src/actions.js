import C from './constants'

export const activateApp = () => {
    return (dispatch, getState) => {
        const state = getState()

        if (Object.keys(state.expenses).length > 0
            && state.summs.summExpenses === 0) {
                
            dispatch(updateSumms())
            dispatch(updateLimits())            
        }
    }
}

export const addNewIncome = income => {
    return dispatch => {
        dispatch({
            type: C.ADD_INCOME,
            payload: income
        })

        dispatch(updateSumms())
        dispatch(updateLimits())
    }
}

export const addNewExpense = expense => {
    return dispatch => {
        dispatch({
            type: C.ADD_EXPENSE,
            payload: expense
        })      

        dispatch(fillGaps())
        dispatch(updateSumms())
        dispatch(updateLimits())
    }
}

export const addNotIncluded = expense => {
    return dispatch => {
        dispatch({
            type: C.ADD_NOT_INCLUDED,
            payload: expense
        })

        dispatch(updateSumms())
        dispatch(updateLimits())
    }
}

export const deleteIncome = income => {
    return dispatch => {
        dispatch({
            type: C.DELETE_INCOME,
            payload: income
        })

        dispatch(updateSumms())
        dispatch(updateLimits())
    }
}

export const deleteExpense = expense => {
    return dispatch => {
        dispatch({
            type: C.DELETE_EXPENSE,
            payload: expense
        })      

        dispatch(fillGaps())
        dispatch(updateSumms())
        dispatch(updateLimits())
    }
}

export const deleteNotIncluded = expense => {
    return dispatch => {
        dispatch({
            type: C.DELETE_NOT_INCLUDED,
            payload: expense
        })

        dispatch(updateSumms())
        dispatch(updateLimits())
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