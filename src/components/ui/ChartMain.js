import { PropTypes } from 'prop-types'

import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts' 
import Paper from 'material-ui/Paper'

import { COLORS_CHART as COLORS } from '../../constants'

const styleBarLabel = {
	position: 'top',
	fontSize: 10,
	fill: COLORS.expense
}

const Chart = ({ data=[] }) => 
	<Paper className='Chart' zDepth={3}>
		<ComposedChart width={800} height={400} data={data} 
				margin={{top: 20, right: 20, bottom: 20, left: 20}}>
          	<XAxis dataKey="name" />
          	<YAxis yAxisId="left" />
       		<YAxis yAxisId="right" orientation="right" />
          	<Tooltip/>
          	<Legend/>
          	<CartesianGrid stroke='#f5f5f5'/>
          	<Line yAxisId="left" type='monotone' dataKey='base' stroke={ COLORS.base }/>
          	<Line yAxisId="left" type='monotone' dataKey='corrected' stroke={ COLORS.corrected }/>
          	<Line yAxisId="left" type='monotone' dataKey='fact' stroke={ COLORS.fact }/>
          	<Bar yAxisId="right" dataKey='expense' barSize={10} fill={ COLORS.expense } label={ styleBarLabel } />
       </ComposedChart>
	</Paper>

Chart.propTypes = {
	data: PropTypes.array
}

export default Chart