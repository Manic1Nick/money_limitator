import { Component } from 'react'
import classNames from 'classnames'

import DialogInputSumm from '../dialogs/DialogInputSumm'

import IconButton from 'material-ui/IconButton'
import AddBoxIcon from 'react-material-icons/icons/content/add-box'

import { COLORS_ICONS as COLORS } from '../../../constants'

const ButtonAddNewSumm = ({ isExpense=true, inputNewSumm=f=>f }) => {

    const styles = {
        icon: { color: COLORS.addNewSumm },
        tooltip: { top: '20px' }
    }

    return (
        <div className='ButtonAddNewSumm'>
            <IconButton
                className='icon__button'
                tooltip={`Add new ${isExpense ? 'expense' : 'income'}`} 
                tooltipStyles={ styles.tooltip}
            >
                <AddBoxIcon 
                    className='icon' 
                    style={ styles.icon}
                    onClick={ () => inputNewSumm(isExpense) }
                /> 
            </IconButton>
        </div>
    )
}

export default ButtonAddNewSumm