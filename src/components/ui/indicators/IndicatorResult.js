import { Component } from 'react'

import { calcExpectedResult } from '../../../util/CalcUtil'

import Paper from 'material-ui/Paper'

export default class IndicatorResult extends Component {

	constructor(props) {
		super(props)
		this.state = {
			result: calcExpectedResult(props)
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.summs !== this.props.summs) {
			this.setState({ result: calcExpectedResult(this.props) })
		}
	}

	render() {

		const { result } = this.state,
			style = this._genResultStyle(result),
			text = this._genResultText(result)

		return (
			<div className='Result' style={ style }>
				<h2>{ text }</h2>
			</div>
		)
	}

	_genResultStyle(result) {
		let style = {}

		if (result > 0) style = { color: 'green' }
		else if (result < 0) style = { color: 'red' }

		return style
	}

	_genResultText(result) {
		let text = `Expected result is: ${result}`

		if (result > 0) text = `Expected economy is: +${result}`
		else if (result < 0) text = `Expected shortage is: ${result}`

		return text
	}
}