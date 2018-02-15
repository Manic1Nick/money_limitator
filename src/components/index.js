import React, { Component } from 'react'

import HeadBlock from './containers/HeadBlock'
import LimitsBlock from './containers/LimitsBlock'
import Chart from './containers/Chart'
import ShowErrors from './containers/ShowErrors'

export default class MainPage extends Component {
	render() {
		return (
			<div className='App'>
				<HeadBlock />
				<LimitsBlock />
				<Chart />
				<ShowErrors />
			</div>
		)	
	}
}