import { Component } from 'react'

import DateUtil from '../../util/DateUtil'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import DatePicker from 'material-ui/DatePicker'
import ArrowLeftIcon from 'react-material-icons/icons/hardware/keyboard-arrow-left'
import ArrowRightIcon from 'react-material-icons/icons/hardware/keyboard-arrow-right'
import IconButton from 'material-ui/IconButton'

export default class DialogInputSumm extends Component {
	constructor(props) {
		super()
		this.state = {
			isExpense: props.isExpense,
			date: new Date(),
			summ: '',
			notIncluded: false
		}
	}

	updateCheck = () => {
        this.setState((oldState) => {
            return {
                notIncluded: !oldState.notIncluded,
            }
        })
    }

    onEditDate = (e, date) => {
        let summ = this.props.listSumms[DateUtil.formatDate(date)]
        summ = summ >= 0 ? summ : ''

    	this.setState({ date, summ })
    }

    onInputSumm = (e) => {
    	this.setState({ summ: e.target.value })
    }

    handleAddSumm = () => {
        const { date, summ } = this.state

        let data = this.state
        data.date = DateUtil.formatDate(date)
        data.summ = summ ? parseInt(summ) : 0
        
    	this.props.addSumm(data)
    	this.clearState()
    }

    onChangeDate = (changer) => {
        const date = DateUtil.changeDate(this.state.date, changer)

        this.onEditDate(null, date)
    }

    closeDialog = () => {
        this.clearState()
        this.props.onClose()
    }   

    clearState = () => {
        this.setState({
            date: new Date(),
            summ: '',
            notIncluded: false
        })
    }

	render() {

		const { open, isExpense } = this.props

		const styles = {
		    block: {
		        maxWidth: 250,
		    },
		    checkbox: {
		        marginBottom: 16,
		    },
		}

		const actions = [
    	    <FlatButton
    	        label="Close"
    	        primary={ true }
    	        onClick={ this.closeDialog }
    	    />,
    	    <FlatButton
    	        label="Add"
    	        primary={ true }
    	        onClick={ this.handleAddSumm }
    	    />
    	]

    	const inputDate =
            <div className='InputSumm__date'>
                <IconButton>
                    <ArrowLeftIcon 
                        onClick={ () => this.onChangeDate(-1) }
                    />
                </IconButton>
        		<DatePicker
              	  	value={ this.state.date }
                    onChange={ this.onEditDate }
                    autoOk={ true }
              	/>
                <IconButton>
                    <ArrowRightIcon 
                        onClick={ () => this.onChangeDate(1) }
                    />
                </IconButton>
            </div>

    	const inputSumm =
    		<TextField
                className='InputSumm__summ'
                value={ this.state.summ }
    		  	onChange={ this.onInputSumm }
                autoFocus
    		/>

    	const notIncluded =
    		(isExpense) ?

    			<div style={styles.block}>
            	    <Checkbox
            	        label="Not included to limits"
            	        checked={ this.state.notIncluded }
            	        onCheck={ this.updateCheck.bind(this) }
            	        style={ styles.checkbox }
            	    />  
            	</div>
    			
    			: null

    	return (
    	    <Dialog
                className='DialogInputSumm'
                title={ isExpense ? 'Input new expense' : 'Input new income' }
    	        open={ open }
                actions={ actions }
                modal={ false }
                contentStyle={{ width: '400px' }}
    	        onRequestClose={ this.closeDialog }
    	        autoScrollBodyContent={ true }
    	    >
    	        Date: { inputDate } <br />
    			Summ: { inputSumm } <br />
    			{ notIncluded }
    	    </Dialog>
    	)
	}
}