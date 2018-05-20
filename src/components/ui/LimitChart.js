import { PropTypes } from 'prop-types'

import { ResponsiveContainer, PieChart, Pie, Sector, Cell, Legend, Label } from 'recharts'

const LimitChart = ({ daysDone, daysRest, summs={} }) => {
    
    const { summIncomes, summExpenses, summNotIncluded } = summs,
        currentBalance = summIncomes - summNotIncluded - summExpenses

    const data = [
            {
                name: "Money",
                data: [
                    {name: 'Money done', value: summExpenses}, 
                    {name: 'Money rest', value: currentBalance}
                ]
            },
            {
                name: "Days",
                data: [
                    {name: 'Days done', value: daysDone + 1}, 
                    {name: 'Days rest', value: daysRest}
                ]
            }
        ],
        COLORS = ['#00C49F', '#FF8042'],
        MARGINS_X = [ 150, 450 ],
        RADIAN = Math.PI / 180,
        NAMES = [ 'Money', 'Days' ],
        HEIGHT = currentBalance > -200 ? 140 : 200

    return (
        <ResponsiveContainer height={ HEIGHT }>
            <PieChart>
            {
                data.map((obj, i) =>
                    <Pie
                        key={i}
                        data={obj.data}
                        cx={ MARGINS_X[i % MARGINS_X.length] }
                        cy={120}           
                        dataKey="value" 
                        startAngle={180}
                        endAngle={0}
                        innerRadius={60}
                        outerRadius={80} 
                        fill="#8884d8"
                        paddingAngle={5}
                        label
                    >
                    {
                        obj.data.map((obj2, i) => 
                            <Cell 
                                key={i} 
                                fill={ COLORS[i % COLORS.length] } 
                            />
                        )
                    }
                        <Label position="center">
                        { 
                            NAMES[i % NAMES.length] 
                        }
                        </Label>
                    </Pie>                        
                )
            }
            </PieChart>
        </ResponsiveContainer>
    )
}

LimitChart.propTypes = {
	daysDone: PropTypes.number,
	daysRest: PropTypes.number,
	summs: PropTypes.object
}

export default LimitChart
