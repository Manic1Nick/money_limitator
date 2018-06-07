import { Component } from 'react'

import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'

export default class IndicatorPeriod extends Component {

	constructor(props) {
		super(props)
		this.state = ({ screenSize: props.screenSize })
	}

	componentWillReceiveProps(nextProps) {
        if (this.props.screenSize !== nextProps.screenSize) {
            this.setState({ screenSize: nextProps.screenSize })
		}
    }

	render() {

		const { begin, end } = this.props.period,
			{ screenSize } = this.state,
			message = "It's demo version. Please send me 10 dollars if you want to use full version ;)"

		return (
			<Paper className='Period' zDepth={1}>
				<BtnPeriod 
					label={ screenSize === 'XS' ? 'Prev' : 'Previous' }
					onClick={ () =>  alert(message) }
				/>

				<div className='Period__title'>from { begin } to { end }</div>
				
				<BtnPeriod 
					label="Next" 
					onClick={ () => alert(message) }
				/>
			</Paper>
		)
	}
}

const BtnPeriod = (props) =>
	<FlatButton {...props} className='btn__period' style={{ color: '#A9A9A9' }}/>