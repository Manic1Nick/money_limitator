import { Component } from 'react'
import posed from 'react-pose'

import IconButton from 'material-ui/IconButton'
import SaveIcon from 'react-material-icons/icons/content/save'
import ClearIcon from 'react-material-icons/icons/content/backspace'
import DeleteIcon from 'react-material-icons/icons/action/delete'

import { formatDate } from '../../util/DateUtil'
import { COLORS_ICONS as COLORS } from '../../constants'

const ENTER_KEY = 13
const ESC_KEY = 27

export default class SummEditor extends Component {

    constructor(props) {
        super(props)
        this.state = { 
            date: props.editingDate,
            summ: props.editingSumm
        }
    }

    componentDidMount() {
        this.inputField.focus()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.setState({
                date: nextProps.editingDate,
                summ: nextProps.editingSumm
            })
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.state !== nextState) {
            this.inputField.focus()
        }
    }

    handleEditSumm(e) {
        this.setState({ summ: e.target.value })
    }

    handleSaveSumm() {
        let objDateSumm = this._createObjDateSumm(this.state.summ)
        this.props.saveSumm(objDateSumm)
    }

    handleDeleteSumm() {
        let objDateSumm = this._createObjDateSumm(this.state.summ)
        this.props.deleteSumm(objDateSumm)
    }

    handleSummEditKeyDown(e) {
        if (e.keyCode === ENTER_KEY) { 
            this.handleSaveSumm()
            
        } else if (e.keyCode === ESC_KEY) { 
            this.props.cancelEditing()
        }
    }

    handleClearSumm() {
        this.setState({ summ: '' })
    }

    render() {
        const { date, summ } = this.state,
            iconStyles = {
                save: { color: COLORS.save },
                clear: { color: COLORS.clear },
                delete: { color: COLORS.delete },
                tooltip: { top: '25px' }
            }

        return (
            <div className='SummEditor'>
                <div className='SummEditor__date'>
                    { date } :                
                </div>
                <div className='SummEditor__data'>
                    <input
                        type='number'
                        value={ summ }
                        onKeyDown={ this.handleSummEditKeyDown.bind(this) }
                        onChange={ this.handleEditSumm.bind(this) }
                        ref={ (input) => this.inputField = input }
                    />
                </div>
                <div className='SummEditor__actions'>

                    <IconButton
                        className='icon__button'
                        iconStyle={ iconStyles.save }
                        tooltip='Save' 
                        tooltipStyles={ iconStyles.tooltip }
                    >
                        <SaveIcon 
                            className='icon icon__save'
                            onClick={ this.handleSaveSumm.bind(this) }
                        />
                    </IconButton>

                    <IconButton
                        className='icon__button'
                        iconStyle={ iconStyles.clear }
                        tooltip='Clear' 
                        tooltipStyles={ iconStyles.tooltip }
                    >
                        <ClearIcon 
                            className='icon icon__clear'
                            onClick={ this.handleClearSumm.bind(this) }
                        />
                    </IconButton>

                    <IconButton
                        className='icon__button'
                        iconStyle={ iconStyles.delete }
                        tooltip='Delete' 
                        tooltipStyles={ iconStyles.tooltip }
                    >
                        <DeleteIcon 
                            className='icon icon__delete'
                            onClick={ this.handleDeleteSumm.bind(this) }
                        />
                    </IconButton>                   
                    
                </div>
            </div>
        )
    }

    _createObjDateSumm(summ) {
        let objDateSumm = {}
        objDateSumm.date = this.state.date
        objDateSumm.summ = summ ? parseInt(summ) : 0
        objDateSumm.isExpense = this.props.isExpense

        return objDateSumm
    }
}