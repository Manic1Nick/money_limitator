import { Component } from 'react'

import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts' 
import Paper from 'material-ui/Paper'

import { COLORS_CHART as COLORS } from '../../../constants'
import { COLORS_LIMITS } from '../../../constants'


export default class ChartMain extends Component {
	
	constructor(props) {
		super(props)
		this.state = { 
			data: props.data,
			activeIndex: -1,
			isMobile: false
		}
	}

	componentDidMount() {
		this.setState({ isMobile: window.innerWidth < 768 })
	}

	componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.setState({ data: nextProps.data })
		}
		if (nextProps.stopEditing) {
			this.setState({ activeIndex: -1 })
		}
    }
	
	handleClickOnBar(data, index) {
		this.setState({ activeIndex: index })

		this.props.openEditing(index)
	}
	
	render() {
		const { data, activeIndex, isMobile } = this.state, 
			{ base, corrected, fact } = COLORS_LIMITS

		let styles = {
			chart: {
				width: isMobile ? 540 : 800,
				height: isMobile ? 270 : 400
			},
			barLabel: {
				position: 'top',
				fontSize: isMobile ? 8 : 10,
				fill: COLORS.expenseActive
			},
			bar: { size: isMobile ? 5 : 10 },
			axis: { fontSize: isMobile ? 8 : 12 }
		}

		return(
			<ComposedChart width={ styles.chart.width } height={ styles.chart.height } 
				data={data} 
				margin={{top: 20, right: 20, bottom: 20, left: 20}}
			>
				<XAxis dataKey="name" tick={ styles.axis } />
				<YAxis yAxisId="left" tick={ styles.axis } />
				<YAxis yAxisId="right" orientation="right" tick={ styles.axis } />
				<Tooltip content={ this._tooltipContent } />
				<Legend payload={ this._legendPayload() } height={5} />
				<CartesianGrid stroke='#f5f5f5'/>	

				<Line yAxisId="left" type='monotone' dataKey='base' stroke={ base }/>
				<Line yAxisId="left" type='monotone' dataKey='corrected' stroke={ corrected }/>
				<Line yAxisId="left" type='monotone' dataKey='fact' stroke={ fact }/>

				<Bar yAxisId="right" dataKey='expense' 
					barSize={ styles.bar.size } label={ styles.barLabel }
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

	_tooltipContent = (tooltipProps) => {
		return(
			<Paper zDepth={3}>
				<ul className='ChartTooltip'>
					<li>{ tooltipProps.label }</li>
					{
						tooltipProps.payload.map((data, i) =>
							<li key={i} 
								style={	
									data.name === 'expense' 
									? { color: COLORS.expenseActive } 
									: { color: `${data.color}` }
								}
							>
								{data.name} : {data.value}
							</li>
						)
					}
				</ul>
			</Paper>
		)
	}

	_legendPayload = () => {
		const { base, corrected, fact } = COLORS_LIMITS
		
		let payload = [
			{ dataKey: 'base', value: 'base', type: 'line', color: `${ base }` },
			{ dataKey: 'corrected', value: 'corrected', type: 'line', color: `${ corrected }` },
			{ dataKey: 'fact', value: 'fact', type: 'line', color: `${ fact }` },
			{ dataKey: 'expense', value: 'expense', type: 'square', color: `${ COLORS.expense }` }
		]
		return payload
	}
}