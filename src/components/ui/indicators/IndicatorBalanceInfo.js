import { PropTypes } from 'prop-types'
import { Component } from 'react'
import classNames from 'classnames'

import DialogBalanceInfo from '../dialogs/DialogBalanceInfo'

import FlatButton from 'material-ui/FlatButton'
import { buildStylePropertyString } from 'stylefire';

export default class IndicatorBalanceInfo extends Component {

	constructor(props) {
		super(props)
		this.state = { 
			balance: this._calcBalance(),
			openBalanceInfo: false,
			updated: false
		}
	}

	componentDidMount() {
		this.activeUpdated()
		this.setState({ isMobile: window.innerWidth < 768 })
	}

    componentDidUpdate(prevProps) {
		let newBalance = this._calcBalance()

		if (this.state.balance !== newBalance) {
			this.setState({ balance: newBalance })
			this.activeUpdated()
		}
	}

	handleOpenDialog() {
		this.setState({ openBalanceInfo: true })
	}

	handleCloseDialog() {
		this.setState({ openBalanceInfo: false })
	}	

	activeUpdated() {
        this.setState({ updated: true })
        
		setTimeout(() => {
			this.setState({ updated: false })
		}, 1000)
	}

	render() {

		const { balance, openBalanceInfo, updated, isMobile } = this.state,
			{ daysRest, screenSize } = this.props		
	
		let labelSumm = `balance: $${ balance }`,	
			animateUpdated = classNames({ 'animationUpdated': updated }),
			labelStyle = { fontWeight: 'bold' }

		if (screenSize === 'XS') {
			labelSumm = labelSumm.replace(/balance/i, 'bal'),
			Object.assign(labelStyle, { fontSize: '10px' })
		}
	
		return (
            <div className='BalanceInfo'>
                <FlatButton
                    className={`button ${animateUpdated}`}
                    label={ labelSumm }
					onClick={ () => this.handleOpenDialog() }
					labelStyle={ labelStyle}
                />
        
                <DialogBalanceInfo
                    open={ openBalanceInfo }
                    limitsData={ this.props }
                    modal={ false }
                    closeDialog={ this.handleCloseDialog.bind(this) }
                />
            </div>
		)
	}

	_calcBalance() {
		const { summs: { summIncomes, summExpenses, summNotIncluded } } = this.props

		return (summIncomes - summNotIncluded - summExpenses)
	}
}

IndicatorBalanceInfo.propTypes = {
	props: PropTypes.object
}