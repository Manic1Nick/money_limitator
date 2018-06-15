import { Component } from 'react'
import Paper from 'material-ui/Paper'
import posed from 'react-pose'

import ChartMain from './charts/ChartMain'
import ButtonUndoLastAction from './buttons/ButtonUndoLastAction'
import SummEditor from './SummEditor'

const PosedChartHead = posed.div({
    visible: { width: '100%', height: 28 },
    hidden: { width: 0, height: 0 }
})

export default class MonitorChart extends Component {

    constructor(props) {
        super()
        this.state = { editingDate: '' }
    }
    
    openEditSumm = (index) => {
        const editingDate = this.props.dates[index]
        this.setState({ editingDate })
    }
    
    onSaveSumm = (objDateSumm) => {
        this.props.addSumm(objDateSumm)
        this.closeInputSumm()
    }
    
    onDeleteSumm = (objDateSumm) => {
        this.props.deleteSumm(objDateSumm)
        this.closeInputSumm()
    }

    closeInputSumm = () => {
        this.setState({ editingDate: '' })
    }

    renderSummEditor() {
        const { expenses } = this.props,
            { editingDate } = this.state

        if (!editingDate) return null

        return(
            <div className='MonitorChart__editor'>
                <SummEditor 
                    editingDate={ editingDate }
                    editingSumm={ expenses[editingDate] }
                    isExpense={ true }
                    saveSumm={ this.onSaveSumm.bind(this) }
                    deleteSumm={ this.onDeleteSumm.bind(this) }
                    cancelEditing={ this.closeInputSumm.bind(this) }
                />
            </div>
        )
    }

    renderChartTitle() {
        const { editingDate } = this.state,
            { undoState, historyStates } = this.props
        
        if (editingDate) return null

        return(
            <div className='MonitorChart__title'>
                <span>Click on any bar below to change expense</span>
                {
                    historyStates.length > 0
                ?
                    <ButtonUndoLastAction onUndo={ undoState } />
                :
                    null
                }
            </div>
        )
    }

    render() {
        const { data } = this.props,
            isEditing = this.state.editingDate !== '',
            summEditorVisible = isEditing ? 'visible' : 'hidden', 
            chartTitleVisible = isEditing ? 'hidden' : 'visible'

        return (
            <Paper className='MonitorChart' zDepth={3}>
                <div className='MonitorChart__head'>
                    <PosedChartHead pose={ summEditorVisible }>
                    {  
                        this.renderSummEditor() 
                    }
                    </PosedChartHead>

                    <PosedChartHead pose={ chartTitleVisible }>
                    { 
                        this.renderChartTitle() 
                    }
                    </PosedChartHead>                
                </div>

                <ChartMain 
                    className='Chart'
                    stopEditing={ !isEditing }
                    data={ data } 
                    openEditing={ this.openEditSumm }
                    screenSize={ this.props.screenSize }
                />

            </Paper>
        )
    }
}