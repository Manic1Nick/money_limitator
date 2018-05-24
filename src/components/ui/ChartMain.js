import { Component } from 'react'

import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts' 

import { COLORS_CHART as COLORS } from '../../constants'


export default class ChartMain extends Component {
	
	constructor(props) {
		super(props)
		this.state = { 
			data: props.data,
			activeIndex: -1
		}
	}

	componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.setState({ data: nextProps.data })
        }
    }
	
	handleClickOnBar(data, index) {
		this.setState({
			activeIndex: index
		})

		this.props.openEditing(index)
	}
	
	render() {
		const { data, activeIndex } = this.state, 
			styleBarLabel = {
				position: 'top',
				fontSize: 10,
				fill: COLORS.expenseActive
			}

		return(
			<ComposedChart width={800} height={400} 
				data={data} 
				margin={{top: 20, right: 20, bottom: 20, left: 20}}
			>
				<XAxis dataKey="name" />
				<YAxis yAxisId="left" />
				<YAxis yAxisId="right" orientation="right" />
				<Tooltip />
				<Legend />
				<CartesianGrid stroke='#f5f5f5'/>	

				<Line yAxisId="left" type='monotone' dataKey='base' stroke={ COLORS.base }/>
				<Line yAxisId="left" type='monotone' dataKey='corrected' stroke={ COLORS.corrected }/>
				<Line yAxisId="left" type='monotone' dataKey='fact' stroke={ COLORS.fact }/>

				<Bar yAxisId="right" dataKey='expense' barSize={10} label={ styleBarLabel } 
					onClick={ this.handleClickOnBar.bind(this) } 
				>
				{
					data.map((entry, index) => (
							<Cell cursor="pointer" 
								fill={ index === activeIndex ? COLORS.expenseActive : COLORS.expense } 
								key={`cell-${index}`}
							/>
					))
				}
				</Bar>
			</ComposedChart>
		)
	}
}