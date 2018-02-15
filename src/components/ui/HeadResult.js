import { Component } from 'react'

import CalcUtil from '../../util/CalcUtil'

import Paper from 'material-ui/Paper'

export default class HeadResult extends Component {

	render() {

		const result = CalcUtil.calcExpectedResult(this.props)

		let style, text

		if (result === 0) {
			style = {}
			text = `Expected result is: ${result}`			
		
		} else if (result > 0) {
			style = { 'color': 'green' }
			text = `Expected economy is: +${result}`

		} else if (result < 0) {
			style = { 'color': 'red' }
			text = `Expected shortage is: ${result}`
		}

		return (
			<div className='HeadResult' style={ style }>
				{ text }
			</div>
		)
	}
}