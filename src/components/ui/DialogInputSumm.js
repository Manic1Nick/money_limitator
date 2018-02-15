import { Component } from 'react'

import DateUtil from '../../util/DateUtil'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import DatePicker from 'material-ui/DatePicker'

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

    onChangeDate = (e, date) => {

        const summ = this.props.listSumms[DateUtil.formatDate(date)]
        if (summ >= 0) this.setState({ summ })

    	this.setState({	date })
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

    	this.setState({
    		date: new Date(),
			summ: '',
			notIncluded: false
    	})
    }

	render() {

		const { open, isExpense, onClose } = this.props

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
    	        onClick={ () => onClose() }
    	    />,
    	    <FlatButton
    	        label="Add"
    	        primary={ true }
    	        onClick={ this.handleAddSumm }
    	    />
    	]

    	const inputDate = 
    		<DatePicker
          	  	defaultDate={ this.state.date }
                onChange={ this.onChangeDate }
                autoOk={ true }
          	/>

    	const inputSumm =
    		<TextField
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
                title={ isExpense ? 'Input new expense' : 'Input new income' }
    	        open={ open }
                actions={ actions }
                modal={ false }
                contentStyle={{ width: '400px' }}
    	        onRequestClose={ () => onClose() }
    	        autoScrollBodyContent={ true }
    	    >
    	        Date: { inputDate } <br />
    			Summ: { inputSumm } <br />
    			{ notIncluded }
    	    </Dialog>
    	)
	}
}