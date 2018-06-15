import { Component } from 'react'

import ButtonSummEditorAction from './buttons/ButtonSummEditorAction'

import { SUMM_EDITOR_ACTIONS as ACTIONS } from '../../constants'

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
        const { date, summ } = this.state

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
                {
                    ACTIONS.map((actionName, index) =>
                        <ButtonSummEditorAction
                            key={ index }
                            name={ actionName }
                            onSave={ this.handleSaveSumm.bind(this) }
                            onClear={ this.handleClearSumm.bind(this) }
                            onDelete={ this.handleDeleteSumm.bind(this) }
                        />
                    )
                }
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