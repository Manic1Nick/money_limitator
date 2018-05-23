import { PropTypes } from 'prop-types'

import { RadialBarChart, RadialBar, Legend } from 'recharts'

import { COLORS_CHART as COLORS } from '../../constants'

const ChartLimits = ({ limits={} }) => {

    const data = genData(limits),
        maxLimit = findMaxLimit(limits),
        maxAngle = 180 - 180 * maxLimit / limits.base,
        
        styleLegend = {
            top: 0,
            left: 350,
            lineHeight: '24px'
        }

    return (
        <RadialBarChart 
            width={500} height={ maxAngle >= 0 ? 140 : 280 } cx={150} cy={150} 
            innerRadius={20} outerRadius={140} barSize={20} 
            startAngle={180} endAngle={ maxAngle }
            data={data} 
        >
            <RadialBar 
                minAngle={15} 
                label={{ position: 'insideStart', fill: '#fff' }} 
                background clockWise={true} dataKey='uv'
            />
            <Legend 
                iconSize={10} width={160} height={140} 
                layout='vertical' verticalAlign='middle' wrapperStyle={ styleLegend }
            />
        </RadialBarChart>
    )
}

const findMaxLimit = (limits) => {
    let maxLimit = 0

    Object.keys(limits).forEach(name => {
        if (limits[name] > maxLimit) maxLimit = limits[name]
    })
    return maxLimit
}

const genData = (limits) => {
    let data = []

    Object.keys(limits).forEach(name => {
        data.push({
            name: `${name} limit`,
            uv: limits[name],
            fill: COLORS[name]
        })
    })
    return data
}

ChartLimits.propTypes = {
	limits: PropTypes.object
}

export default ChartLimits
