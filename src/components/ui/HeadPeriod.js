import { Component } from 'react'

import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'

export default class HeadPeriod extends Component {

	render() {

		const { begin, end } = this.props.period

		return (
			<Paper className='HeadPeriod' zDepth={1}>
				<BtnPeriod 
					label="Previous" 
					onClick={ () => console.log('go previuos period') }
				/>
				<span>from { begin } to { end }</span>
				<BtnPeriod 
					label="Next" 
					onClick={ () => console.log('go next period') }
				/>
			</Paper>
		)
	}
}

const BtnPeriod = (props) =>
	<FlatButton {...props} className='btn__period' style={{ color: '#A9A9A9' }}/>