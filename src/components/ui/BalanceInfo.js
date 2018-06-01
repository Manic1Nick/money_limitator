import { PropTypes } from 'prop-types'
import { Component } from 'react'
import classNames from 'classnames'

import DialogBalanceInfo from './DialogBalanceInfo'

import FlatButton from 'material-ui/FlatButton'

export default class BalanceInfo extends Component {

	constructor() {
		super()
		this.state = { 
			openBalanceInfo: false,
            updated: false
		}
	}

	// componentDidMount() {
    //     this.activeUpdated()
	// }

    // componentWillReceiveProps(nextProps) {
	// 	if (nextProps.summs !== this.props.summs) {
	// 		this.activeUpdated()
	// 	}
	// }

	handleOpenDialog() {
		this.setState({ openBalanceInfo: true })
	}

	handleCloseDialog() {
		this.setState({ openBalanceInfo: false })
	}	

	// activeUpdated() {
    //     this.setState({ updated: true })
        
	// 	setTimeout(() => {
	// 		this.setState({ updated: false })
	// 	}, 1000)
	// }

	render() {

		const { props } = this.props,
            { summs: { summIncomes, summExpenses, summNotIncluded }, daysRest } = props,
		    { openBalanceInfo, update } = this.state
	
        let labelSumm = `
            balance: ${ summIncomes - summNotIncluded - summExpenses } / days: ${ daysRest }
        `		
		let updated = classNames({ 'updated': updated })
	
		return (
            <div className='BalanceInfo'>
                <FlatButton
                    className={`button ${updated}`}
                    label={ labelSumm }
                    onClick={ () => this.handleOpenDialog() }
                />
        
                <DialogBalanceInfo
                    open={ openBalanceInfo }
                    limitsData={ props }
                    modal={ false }
                    closeDialog={ this.handleCloseDialog.bind(this) }
                />
            </div>
		)
	}
}

BalanceInfo.propTypes = {
	props: PropTypes.object
}