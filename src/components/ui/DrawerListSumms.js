import { Component } from 'react'

import SummEditor from './SummEditor'

import { deleteZeroDates } from '../../util/CalcUtil'
import { COLORS_ICONS as COLORS } from '../../constants'

import Drawer from 'material-ui/Drawer'
import FlatButton from 'material-ui/FlatButton'
import { List, ListItem } from 'material-ui/List'
import Toggle from 'material-ui/Toggle'
import EditIcon from 'react-material-icons/icons/image/edit'

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
        const { listSumms, isExpenses } = this.props

        return (
            <ListItem 
                key={index}
                className='ListItem'
            >
                <SummEditor 
                    editingDate={ date }
                    editingSumm={ listSumms[date] }
                    isExpense={ isExpenses }
                    saveSumm={ this.onSaveSumm.bind(this) }
                    deleteSumm={ this.onDeleteSumm.bind(this) }
                    cancelEditing={ this.clearEditingDate.bind(this) }
                />
            </ListItem>
        )
    }

    renderItem(date, index) {
        const { listSumms } = this.props

        const styles = {
            icon: { color: COLORS.edit }
        }

        return (
            <ListItem 
                key={index} 
                //onClick={ () => this.clearEditingDate() }
                rightIcon={
                    <EditIcon 
                        style={ styles.icon }
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
        const { open, listName='', listSumms={}, isExpenses=false, openInput=f=>f, is_XS=false } = this.props,
            { showEmptyDates } = this.state,

            showingListSumms = showEmptyDates 
                ? listSumms 
                : deleteZeroDates(listSumms)

        let styles = {
            drawer: { width: 333 },
            foot: { maxWidth: 250 },
            toggle: { marginBottom: 16}
        }

        if (is_XS) {
            styles.drawer.width = 233
            styles.toggle.fontSize = '10px'
            styles.addNewButton = { fontSize: '10px' }
        }

        return (
            <Drawer
                className='Drawer'
                title={ listName }
                docked={ false }
                open={ open }
                width={ styles.drawer.width }
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
                            onClick={ () => openInput(isExpenses) }
                            labelStyle={ styles.addNewButton }
                        />
                    </div>
                </div>

                <List className='Drawer__ListItems'>
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
                    <div style={ styles.foot }>
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
}