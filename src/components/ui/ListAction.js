import { Component } from 'react'
import classNames from 'classnames'

import DialogInputSumm from './DialogInputSumm'

import IconButton from 'material-ui/IconButton'
import AddBoxIcon from 'react-material-icons/icons/content/add-box'

import { COLORS_ICONS as COLORS } from '../../constants'

export default class ListAction extends Component {

    constructor(props) {
        super()
        this.state = {
            openInputSumm: false
        }
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

    render() {

        const { listName, listSumms } = this.props,
            isExpense = (listName === 'Expenses')

        return (
            <div className='ListAction'>
                <IconButton
                    className='icon__button'
                    tooltip={`Add new ${isExpense ? 'expense' : 'income'}`} 
                    tooltipStyles={{ top: '20px' }}
                >
                    <AddBoxIcon 
                        className='icon' 
                        style={{ color: COLORS.addNewSumm }}
                        onClick={ () => this.openInputSumm() }
                    /> 
                </IconButton>

                <DialogInputSumm
                    open={ this.state.openInputSumm }
                    isExpense={ isExpense }
                    listSumms={ listSumms }
                    addSumm={ this.onAddSumm }
                    onClose={ this.closeInputSumm }
                />
            </div>
        )
    }
}