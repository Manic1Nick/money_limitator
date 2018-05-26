import { Component } from 'react'
import Paper from 'material-ui/Paper'
import UndoIcon from 'react-material-icons/icons/content/undo'
import ReactTooltip from 'react-tooltip'

import DialogInputSumm from './DialogInputSumm'
import ChartMain from './ChartMain'
import SummEditor from './SummEditor'
import { formatDate } from '../../util/DateUtil'

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
        
        this.closeInputSumm()
    }
    
    onDeleteSumm = (objDateSumm) => {
        this.props.deleteSumm(objDateSumm)
        
        this.closeInputSumm()
    }

    closeInputSumm = () => {
        this.savePrevSumm()
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
        this.closeInputSumm()
    }

    renderSummEditor() {
        const { expenses } = this.props,
            { editingDate } = this.state

        return(
            <SummEditor 
                editingDate={ editingDate }
                editingSumm={ expenses[editingDate] }
                isExpense={ true }
                saveSumm={ this.onSaveSumm.bind(this) }
                deleteSumm={ this.onDeleteSumm.bind(this) }
                cancelEditing={ this.closeInputSumm.bind(this) }
            />
        )
    }

    renderChartHead() {
        const { prevSumms } = this.state,
            tooltipMessage = `Undo last action`

        return(
            <div className='ChartBlock__head'>
                <span>Click on any bar below to change expense</span>
                {
                    prevSumms.length
                ?
                    <a data-tip={ tooltipMessage }>
                        <UndoIcon 
                            className='ChartBlock__undo icon'
                            style={{ color: '#aaaaaa' }}
                            onClick={ this.undoEditing }
                        />
                        <ReactTooltip place="right" type="info" effect="solid" />
                    </a>
                    
                :
                    null   
                }
            </div>
        )
    }

    render() {
        const { data } = this.props,
            { editingDate } = this.state

        return (
            <Paper className='ChartBlock' zDepth={3}>
                <div className='ChartBlock__editor'>
                {
                    editingDate
                ?
                    this.renderSummEditor()
                :
                    this.renderChartHead()
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