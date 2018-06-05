import { Component } from 'react'

import { 
    getNextFreeDate, 
    formatDate, 
    shiftDate 
} from '../../../util/DateUtil'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import DatePicker from 'material-ui/DatePicker'
import ArrowLeftIcon from 'react-material-icons/icons/hardware/keyboard-arrow-left'
import ArrowRightIcon from 'react-material-icons/icons/hardware/keyboard-arrow-right'
import IconButton from 'material-ui/IconButton'

const ENTER_KEY = 13
const ESC_KEY = 27

export default class DialogInputSumm extends Component {
	constructor(props) {
		super()
		this.state = {
			isExpense: props.isExpense,
			date: new Date(getNextFreeDate(props.listSumms)),
            summ: '',
            errorText: '',
			notIncluded: false
		}
	}

    componentWillUpdate = (nextProps, nextState) => {
        if (this.refs.inputSumm) this.refs.inputSumm.focus()
    }

    componentDidUpdate(prevProps) {
		if (prevProps.listSumms !== this.props.listSumms) {
            let date = new Date(getNextFreeDate(this.props.listSumms))
			this.setState({ 
                date,
                isExpense: this.props.isExpense 
            })
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
        let summ = this.props.listSumms[formatDate(date)]
        summ = summ >= 0 ? summ : this.state.summ

    	this.setState({ date, summ })
    }

    onChange = (e) => {
        if (parseInt(e.target.value) >= 0 || e.target.value === '') {
            this.setState({ 
                summ: e.target.value,
                errorText: ''
            })
        } else {
            this.setState({ errorText: 'Summ must be a number' })
        }
    }

    onAddSumm = () => {
        const { date, summ } = this.state

        let data = this.state
        data.date = formatDate(date)
        data.summ = summ ? parseInt(summ) : ''
        
        this.props.addSumm(data)
    }

    handleAddSummAndCloseDialog = () => {
        this.onAddSumm()
        this.closeDialog()
    }

    handleAddSummAndGoNextDate = () => {
        this.onAddSumm()
        this.shiftDate(1)
    }

    shiftDate = (shift) => {
        const date = shiftDate(this.state.date, shift)

        this.onEditDate(null, date)
    }

    closeDialog = () => {
        this.clearState()
        this.props.onClose()
    }   

    clearState = () => {
        this.setState({
            date: new Date(getNextFreeDate(this.props.listSumms)),
            summ: '',
            errorText: ''
        })
    }

    handleSummEditKeyDown(e) {
        switch (e.keyCode) {
            case ENTER_KEY: this.handleAddSummAndGoNextDate()
            case ESC_KEY: this.closeDialog()
        }
    }

	render() {

		const { open, isExpense } = this.props

		const styles = {
		    block: { maxWidth: 250 },
		    checkbox: { marginBottom: 16 },
		}

		const actions = [
    	    <FlatButton
    	        label="Close"
    	        primary={ true }
    	        onClick={ this.closeDialog }
    	    />,
            <FlatButton
                label="Add & Next"
                primary={ true }
                onClick={ this.handleAddSummAndGoNextDate }
            />,
    	    <FlatButton
    	        label="Add"
    	        primary={ true }
    	        onClick={ this.handleAddSummAndCloseDialog }
    	    />
    	]

    	const inputDate =
            <div className='InputSumm__date'>
                <IconButton>
                    <ArrowLeftIcon 
                        onClick={ () => this.shiftDate(-1) }
                    />
                </IconButton>
        		<DatePicker
              	  	value={ this.state.date }
                    onChange={ this.onEditDate }
                    autoOk={ true }
              	/>
                <IconButton>
                    <ArrowRightIcon 
                        onClick={ () => this.shiftDate(1) }
                    />
                </IconButton>
            </div>

    	const inputSumm =
    		<TextField
                className='InputSumm__summ'
                //id={ formatDate(this.state.date) }
                value={ this.state.summ }
                onChange={ this.onChange.bind(this) }
                errorText={ this.state.errorText }
                autoFocus
                refs='inputSumm'
                onKeyDown={ this.handleSummEditKeyDown.bind(this) }
    		/>

    	const checkboxNotIncluded =
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
    			{ checkboxNotIncluded }
    	    </Dialog>
    	)
    }
}