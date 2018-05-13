import { Component } from 'react'

import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'

export default class HeadPeriod extends Component {

	render() {

		const { begin, end } = this.props.period,
			message = "It's demo version. Please pay 10 dollars if you want use full version of app. (It's a joke ;)"

		return (
			<Paper className='HeadPeriod' zDepth={1}>
				<BtnPeriod 
					label="Previous" 
					onClick={ () =>  alert(message) }
				/>
				<div>from { begin } to { end }</div>
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