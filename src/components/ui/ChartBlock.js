import { Component } from 'react'
import Paper from 'material-ui/Paper'
import UndoIcon from 'react-material-icons/icons/content/undo'
import posed from 'react-pose'

import IconButton from 'material-ui/IconButton'

import DialogInputSumm from './DialogInputSumm'
import ChartMain from './ChartMain'
import SummEditor from './SummEditor'
import { formatDate } from '../../util/DateUtil'

const PosedChartHead = posed.div({
    visible: { width: '100%', height: 28 },
    hidden: { width: 0, height: 0 }
})

export default class ChartBlock extends Component {

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
            <div className='ChartBlock__editor'>
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

    renderChartMessage() {
        const { prevSumms, editingDate } = this.state
        
        if (editingDate) return null

        return(
            <div className='ChartBlock__message'>
                <span>Click on any bar below to change expense</span>
                { 
                    prevSumms.length > 0
                ? 
                    <IconButton 
                        className='ChartBlock__undo icon__button'
                        tooltip='Undo last action' 
                        tooltipStyles={{ top: '30px' }}
                    >
                        <UndoIcon 
                            className='icon'
                            style={{ color: '#aaaaaa' }}
                            onClick={ this.undoEditing }
                        />
                    </IconButton>
                : 
                    null
                }
            </div>
        )
    }

    render() {
        const { data } = this.props,
            { editingDate } = this.state ,
            summEditorVisible = editingDate ? 'visible' : 'hidden', 
            chartMessageVisible = editingDate ? 'hidden' : 'visible'

        return (
            <Paper className='ChartBlock' zDepth={3}>
                <div className='ChartBlock__head'>
                    <PosedChartHead pose={ summEditorVisible }>
                    {  
                        this.renderSummEditor() 
                    }
                    </PosedChartHead>

                    <PosedChartHead pose={ chartMessageVisible }>
                    { 
                        this.renderChartMessage() 
                    }
                    </PosedChartHead>                
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