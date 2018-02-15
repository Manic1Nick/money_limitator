import { Component } from 'react'

import DrawerListSumms from './DrawerListSumms'
import DialogInputSumm from './DialogInputSumm'

import FlatButton from 'material-ui/FlatButton'
import { List, ListItem } from 'material-ui/List'
import AddBoxIcon from 'react-material-icons/icons/content/add-box'
import Snackbar from 'material-ui/Snackbar'

export default class HeadMoneyAction extends Component {

    constructor(props) {
        super()
        this.state = {
            openListSumms: false,
            openInputSumm: false,
            openSnackbar: false,
            messageSnackbar: ''
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

    openSnackbar = (message) => {
        this.setState({ 
            openSnackbar: true,
            messageSnackbar: message
        })
    }

    closeSnackbar() {
        this.setState({ openSnackbar: false })
    }

    onAddSumm = (data) => {
        this.props.addSumm(data)

        this.closeInputSumm()

        let message = `Summ ${data.summ} from ${data.date} was saved succesfully.`
        this.openSnackbar(message)
    }

    onDeleteSumm = (data) => {
        this.props.deleteSumm(data)

        let message = `Summ ${data.summ} from ${data.date} was deleted succesfully.`
        this.openSnackbar(message)
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
                    onClick={ this.openListSumms }
                />
                <AddBoxIcon 
                    className='HeadMoney__icon' 
                    style={{ color: '#A9A9A9' }}
                    onClick={ this.openInputSumm }
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
                <Snackbar
                    open={ this.state.openSnackbar }
                    message={ this.state.messageSnackbar }
                    autoHideDuration={ 3000 }
                    onRequestClose={ () => this.closeSnackbar() }
                />
            </div>
        )
    }
}