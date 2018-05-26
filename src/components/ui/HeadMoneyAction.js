import { Component } from 'react'

import DrawerListSumms from './DrawerListSumms'
import DialogInputSumm from './DialogInputSumm'

import FlatButton from 'material-ui/FlatButton'
import { List, ListItem } from 'material-ui/List'
import AddBoxIcon from 'react-material-icons/icons/content/add-box'

export default class HeadMoneyAction extends Component {

    constructor(props) {
        super()
        this.state = {
            openListSumms: false,
            openInputSumm: false
        }
    }

    openListSumms = () => {
        this.setState({ openListSumms: true })
    }

    closeListSumms = () => {
        this.setState({ openListSumms: false })
    }
    
    openInputSumm = () => {
        this.setState({ openInputSumm: true })
    }

    closeInputSumm = () => {
        this.setState({ openInputSumm: false })
    }

    onAddSumm = (data) => {
        this.props.addSumm(data)
    }

    onDeleteSumm = (data) => {
        this.props.deleteSumm(data)
    }

    closeListAndOpenInput() {
        this.closeListSumms()
        this.openInputSumm()
    }

    render() {

        const { label, listName, listSumms } = this.props

        return (
            <div className='HeadMoney__action'>
                <FlatButton
                    className='HeadMoney__button'
                    label={ label }
                    onClick={ () => this.openListSumms() }
                />
                <AddBoxIcon 
                    className='HeadMoney__icon icon' 
                    style={{ color: '#A9A9A9' }}
                    onClick={ () => this.openInputSumm() }
                /> 
                
                <DrawerListSumms
                    open={ this.state.openListSumms }
                    listName={ listName }
                    isExpense={ listName === 'Expenses' }
                    listSumms={ listSumms }
                    saveSumm={ this.onAddSumm }
                    deleteSumm={ this.onDeleteSumm }
                    openInput={ () => this.closeListAndOpenInput() }
                    onOpen={ this.openListSumms }
                    onClose={ this.closeListSumms }
                /> 

                <DialogInputSumm
                    open={ this.state.openInputSumm }
                    isExpense={ listName === 'Expenses' }
                    listSumms={ listSumms }
                    addSumm={ this.onAddSumm }
                    onClose={ this.closeInputSumm }
                />
            </div>
        )
    }
}