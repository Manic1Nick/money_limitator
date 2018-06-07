import { PropTypes } from 'prop-types'
import { Component } from 'react'

import IndicatorListSumms from './IndicatorListSumms'
import IndicatorBalanceInfo from './IndicatorBalanceInfo'

import { concatIncomesAndExpenses } from '../../../util/CalcUtil'

import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'

const ListsSummsIndicators = (props) => {

    const { 
        data: { incomes, expenses, notIncluded, summs, daysDone, daysRest, addSumm, deleteSumm },
        inputNewSumm=f=>f,
        screenSize=''
    } = props,
    { summIncomes, summExpenses, summNotIncluded } = summs
    
    let labelIncomes = `incomes: $${ summIncomes - summNotIncluded }`,
        labelExpenses = `expenses: $${ summExpenses }`

    if (screenSize === 'XS') {
        labelIncomes = labelIncomes.replace(/incomes/i, 'inc')
        labelExpenses = labelExpenses.replace(/expenses/i, 'exp')
    }

    return (
        <Paper className='ListsSumms' zDepth={1}>
            <IndicatorListSumms
                listName="Incomes"
                label={ labelIncomes }
                listSumms={ concatIncomesAndExpenses(incomes, notIncluded) }
                inputNewSumm={ inputNewSumm }
                addSumm={ addSumm }
                deleteSumm={ deleteSumm }
                screenSize={ screenSize }
            />
            <Divider />
            
            <IndicatorListSumms
                listName="Expenses"
                label={ labelExpenses }
                listSumms={ expenses }
                inputNewSumm={ inputNewSumm }
                addSumm={ addSumm }
                deleteSumm={ deleteSumm }
                screenSize={ screenSize }
            />
            <Divider />

            <IndicatorBalanceInfo
                summs={ summs }
                daysDone={ daysDone }
                daysRest={ daysRest }
                screenSize={ screenSize }
            />
        </Paper>
    )
}

ListsSummsIndicators.propTypes = {
    data: PropTypes.object,
    inputNewSumm: PropTypes.func
}

export default ListsSummsIndicators