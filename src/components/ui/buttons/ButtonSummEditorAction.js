import { Component } from 'react'
import posed from 'react-pose'

import IconButton from 'material-ui/IconButton'
import SaveIcon from 'react-material-icons/icons/content/save'
import ClearIcon from 'react-material-icons/icons/content/backspace'
import DeleteIcon from 'react-material-icons/icons/action/delete'

import { COLORS_ICONS as COLORS } from '../../../constants'

const ButtonSummEditorAction = ({ name='', onSave=f=>f, onClear=f=>f, onDelete=f=>f }) => {

    const iconSave = 
        <SaveIcon 
            className='icon'
            onClick={ () => onSave() }
        />

    const iconClear = 
        <ClearIcon 
            className='icon'
            onClick={ () => onClear() }
        />

    const iconDelete = 
        <DeleteIcon 
            className='icon'
            onClick={ () => onDelete() }
        />

    const icons = {
        save: iconSave,
        clear: iconClear,
        delete: iconDelete
    }

    const styles = {
        icon: { color: COLORS[name] },
        tooltip: { top: '25px' }
    }

    return (
        <IconButton
            className='icon__button'
            iconStyle={ styles.icon }
            tooltip={ name } 
            tooltipStyles={ styles.tooltip }
        >
        {
            icons[name]
        }
        </IconButton>
    )
}

export default ButtonSummEditorAction