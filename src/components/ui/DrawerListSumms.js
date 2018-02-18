import { Component } from 'react'

import DateUtil from '../../util/DateUtil'
import CalcUtil from '../../util/CalcUtil'

import Drawer from 'material-ui/Drawer'
import FlatButton from 'material-ui/FlatButton'
import { List, ListItem } from 'material-ui/List'
import Toggle from 'material-ui/Toggle'
import EditIcon from 'react-material-icons/icons/image/edit'
import SaveIcon from 'react-material-icons/icons/content/save'
import ClearIcon from 'react-material-icons/icons/content/backspace'
import DeleteIcon from 'react-material-icons/icons/action/delete'

const ENTER_KEY = 13
const ESC_KEY = 27

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

    onSaveSumm() {    
        let data = this._createDataFromState()
        this.props.saveSumm(data)

        this.clearEditingDate()
    }

    onClearSumm() {
        this.fieldSumm.value = 0
    }

    onDeleteSumm() {
        let data = this._createDataFromState()
        this.props.deleteSumm(data)
    }

    onOpenInput() {
        this.props.openInput()

        this.clearEditingDate()
    }

    onClose() {
        this.props.onClose()

        this.clearEditingDate()
    }

    handleSummEditKeyDown(e) {
        if (e.keyCode === ENTER_KEY) { 
            this.onSaveSumm()
            
        } else if (e.keyCode === ESC_KEY) { 
            this.clearEditingDate()
        }
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

    renderListItemEditing(key, index) {
        return (
            <ListItem 
                key={index}
                className='ListItem'
            >
                <div className='ListItem__input'>
                    <div className='ListItem__data'>
                        { key }: 
                        <input
                            type='text'
                            defaultValue={ this.props.listSumms[key] }
                            onKeyDown={ this.handleSummEditKeyDown.bind(this) }
                            ref={ c => this.fieldSumm = c }
                            autoFocus
                        />
                    </div>
                    <div className='ListItem__actions'>
                        <SaveIcon 
                            style={{ color: '#00BFFF' }}
                            onClick={ () => this.onSaveSumm() }
                        />
                        <ClearIcon 
                            style={{ color: '#A9A9A9' }}
                            onClick={ () => this.onClearSumm() }
                        />
                        <DeleteIcon 
                            style={{ color: '#FF6347' }}
                            onClick={ () => this.onDeleteSumm() }
                        />
                    </div>
                </div>
            </ListItem>
        )
    }

    renderListItem(key, index) {
        return (
            <ListItem 
                key={index} 
                //onClick={ () => this.clearEditingDate() }
                rightIcon={
                    <EditIcon 
                        style={{ color: '#A9A9A9' }}
                        onClick={ () => this.handleEditSumm(key) }
                    />
                } 
            >           
                <div className='ListItem__text' > 
                    { key }: { this.props.listSumms[key] }
                </div>
            </ListItem>
        )
    }

    render() {
        const { open, listName='', listSumms={} } = this.props

        const showingListSumms = this.state.showEmptyDates 
            ? listSumms 
            : CalcUtil.deleteZeroDates(listSumms)

        const styles = {
            block: {
                maxWidth: 250,
            },
            toggle: {
                marginBottom: 16,
            },
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
                    Object.keys(showingListSumms).map((key, index) => {
                        return (this.state.editingDate === key) ? 
                            this.renderListItemEditing(key, index) :
                            this.renderListItem(key, index)
                    })
                }
                </List>
                    
                <div className='Drawer__foot'>
                    <div style={ styles.block }>
                        <Toggle
                            label="Show empty dates"
                            style={ styles.toggle }
                            onToggle={ () => this.updateToggle() }
                        />
                    </div>
                </div>
            </Drawer>
        )               
    }

    _createDataFromState() {
        let data = {}
        data.date = DateUtil.formatDate(this.state.editingDate)
        data.summ = this.fieldSumm.value ? parseInt(this.fieldSumm.value) : 0
        data.isExpense = this.props.isExpense

        return data
    }
}