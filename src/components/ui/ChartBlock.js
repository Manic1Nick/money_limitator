import { Component } from 'react'
import Paper from 'material-ui/Paper'

import DialogInputSumm from './DialogInputSumm'
import ChartMain from './ChartMain'
import SummEditor from './SummEditor'
import { formatDate } from '../../util/DateUtil'

export default class ChartBlock extends Component {

    constructor(props) {
        super()
        this.state = {
            editingDate: ''
        }
    }
    
    openEditSumm = (index) => {
        const editingDate = this.props.dates[index]

        this.setState({ editingDate })
    }
    
    onSaveSumm = (data) => {
        this.props.addSumm(data)
        
        this.closeInputSumm()
    }
    
    onDeleteSumm = (data) => {
        this.props.deleteSumm(data)
        
        this.closeInputSumm()
    }

    closeInputSumm = () => {
        this.setState({ editingDate: '' })
    }

    render() {

        const { data, expenses } = this.props,
            { editingDate } = this.state

        return (
            <Paper className='ChartBlock' zDepth={3}>
                <div className='ChartBlock__editor'>
                {
                    editingDate
                ?
                    <SummEditor 
                        editingDate={ editingDate }
                        editingSumm={ expenses[editingDate] }
                        isExpense={ true }
                        saveSumm={ this.onSaveSumm.bind(this) }
                        deleteSumm={ this.onDeleteSumm.bind(this) }
                        cancelEditing={ this.closeInputSumm.bind(this) }
                    />
                :
                    <span>Click on any bar below to change expense</span>
                }
                </div>
                <ChartMain 
                    className='ChartBlock__chart'
                    stopEditing={ editingDate === '' }
                    data={ data } 
                    openEditing={ this.openEditSumm }
                />

            </Paper>
        )
    }
}