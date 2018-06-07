import { Component } from 'react'
import Paper from 'material-ui/Paper'
import UndoIcon from 'react-material-icons/icons/content/undo'
import posed from 'react-pose'

import ChartMain from './charts/ChartMain'
import ButtonUndoLastAction from './buttons/ButtonUndoLastAction'
import SummEditor from './SummEditor'
import DialogInputSumm from './dialogs/DialogInputSumm'
import { formatDate } from '../../util/DateUtil'

const PosedChartHead = posed.div({
    visible: { width: '100%', height: 28 },
    hidden: { width: 0, height: 0 }
})

export default class MonitorChart extends Component {

    constructor(props) {
        super()
        this.state = {
            editingDate: '',
            prevSumms: []
        }
    }
    
    openEditSumm = (index) => {
        const editingDate = this.props.dates[index]

        this.setState({ editingDate })
    }
    
    onSaveSumm = (objDateSumm) => {
        this.props.addSumm(objDateSumm)
        
        this.savePrevSumm()
        this.closeInputSumm()
    }
    
    onDeleteSumm = (objDateSumm) => {
        this.props.deleteSumm(objDateSumm)
        
        this.savePrevSumm()
        this.closeInputSumm()
    }

    closeInputSumm = () => {
        this.setState({ editingDate: '' })
    }

    savePrevSumm = () => {
        const { expenses } = this.props,
            { prevSumms, editingDate } = this.state

        if (editingDate) {
            prevSumms.push({
                date: editingDate,
                summ: expenses[editingDate]
            })
            this.setState({ prevSumms })
        }
    }

    undoEditing = () => {
        const { prevSumms } = this.state,
            prevSumm = prevSumms.pop()

        this.setState({ prevSumms })

        this.props.undoLastAction(prevSumm)
        this.savePrevSumm()
        this.closeInputSumm()
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
        const { prevSumms, editingDate } = this.state
        
        if (editingDate) return null

        return(
            <div className='MonitorChart__title'>
                <span>Click on any bar below to change expense</span>
                { 
                    prevSumms.length > 0
                ? 
                    <ButtonUndoLastAction onUndo={ this.undoEditing.bind(this) } />
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