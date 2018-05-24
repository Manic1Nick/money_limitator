import { Component } from 'react'

import SummEditor from './SummEditor'

import { deleteZeroDates } from '../../util/CalcUtil'

import Drawer from 'material-ui/Drawer'
import FlatButton from 'material-ui/FlatButton'
import { List, ListItem } from 'material-ui/List'
import Toggle from 'material-ui/Toggle'
import EditIcon from 'react-material-icons/icons/image/edit'
import SaveIcon from 'react-material-icons/icons/content/save'
import ClearIcon from 'react-material-icons/icons/content/backspace'
import DeleteIcon from 'react-material-icons/icons/action/delete'

export default class DrawerListSumms extends Component {

    constructor() {
        super()
        this.state = {
            editingDate: '',
            showEmptyDates: false
        }
    }

    handleOpening(open) {
        this.clearEditingDate()

        if (open) this.props.onOpen()
        else this.props.onClose()
    }

    handleEditSumm(editingDate) {
        this.setState({ editingDate })
    }

    onSaveSumm(data) {
        this.props.saveSumm(data)

        this.clearEditingDate()
    }

    onDeleteSumm(data) {
        this.props.deleteSumm(data)
    }

    onOpenInput() {
        this.props.openInput()
    }

    onClose() {
        this.props.onClose()
    }

    clearEditingDate() {
        this.setState({ editingDate: '' })
    }

    updateToggle() {
        this.setState((oldState) => {
            return {
                showEmptyDates: !oldState.showEmptyDates,
            }
        })
    }

    renderItemEditing(date, index) {
        const { listSumms, isExpense } = this.props

        return (
            <ListItem 
                key={index}
                className='ListItem'
            >
                <SummEditor 
                    editingDate={ date }
                    editingSumm={ listSumms[date] }
                    isExpense={ isExpense }
                    saveSumm={ this.onSaveSumm.bind(this) }
                    deleteSumm={ this.onDeleteSumm.bind(this) }
                    cancelEditing={ this.clearEditingDate.bind(this) }
                />
            </ListItem>
        )
    }

    renderItem(date, index) {
        const { listSumms } = this.props

        return (
            <ListItem 
                key={index} 
                //onClick={ () => this.clearEditingDate() }
                rightIcon={
                    <EditIcon 
                        style={{ color: '#A9A9A9' }}
                        onClick={ () => this.handleEditSumm(date) }
                    />
                } 
            >           
                <div className='ListItem__text' > 
                    { date }: { listSumms[date] }
                </div>
            </ListItem>
        )
    }

    render() {
        const { open, listName='', listSumms={} } = this.props,
            { showEmptyDates } = this.state,

            showingListSumms = showEmptyDates 
                ? listSumms 
                : deleteZeroDates(listSumms),

            stylesDrawerFoot = {
                block: { maxWidth: 250 },
                toggle: { marginBottom: 16 }
            }

        return (
            <Drawer
                className='Drawer'
                title={ listName }
                docked={ false }
                open={ open }
                width={ 333 }
                onRequestChange={ (open) => this.handleOpening(open) }
                autoScrollBodyContent={ true }
            >
                <div className='Drawer__head'>
                    <div className='Drawer__title'>
                        { listName }
                    </div>
                    <div className='Drawer__buttons'>
                        <FlatButton
                            label="Add new"
                            primary={ true }
                            onClick={ () => this.onOpenInput() }
                        />
                    </div>
                </div>

                <List>
                {
                    Object.keys(showingListSumms).map((date, index) => {
                        return (this.state.editingDate === date) 
                            ?
                                this.renderItemEditing(date, index) 
                            : 
                                this.renderItem(date, index)
                    })
                }
                </List>
                    
                <div className='Drawer__foot'>
                    <div style={ stylesDrawerFoot.block }>
                        <Toggle
                            label="Show empty dates"
                            style={ stylesDrawerFoot.toggle }
                            onToggle={ () => this.updateToggle() }
                        />
                    </div>
                </div>
            </Drawer>
        )               
    }
}