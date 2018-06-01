import { Component } from 'react'
import classNames from 'classnames'

import DrawerListSumms from './DrawerListSumms'

import FlatButton from 'material-ui/FlatButton'
import { List, ListItem } from 'material-ui/List'

export default class ListSumms extends Component {

    constructor(props) {
        super()
        this.state = {
            openListSumms: false,
            updated: false
        }
    }

    // componentDidMount() {
    //     this.activeUpdated()
    // }

    // componentWillReceiveProps(nextProps) {
	// 	if (nextProps.label !== this.props.label) {
	// 		this.activeUpdated()
	// 	}
	// }

    openListSumms = () => {
        this.setState({ openListSumms: true })
    }

    closeListSumms = () => {
        this.setState({ openListSumms: false })
    }

    onAddSumm = (data) => {
        this.props.addSumm(data)
    }

    onDeleteSumm = (data) => {
        this.props.deleteSumm(data)
    }

    // activeUpdated() {
    //     this.setState({ updated: true })
        
	// 	setTimeout(() => {
	// 		this.setState({ updated: false })
	// 	}, 4000)
    // }

    render() {

        const { label, listName, listSumms } = this.props

        let updated = classNames({ 'updated': this.state.updated })

        return (
            <div className='ListSumms'>
                <FlatButton
                    className={`ListSumms ${updated}`}
                    label={ label }
                    onClick={ () => this.openListSumms() }
                />
                
                <DrawerListSumms
                    open={ this.state.openListSumms }
                    listName={ listName }
                    isExpense={ listName === 'Expenses' }
                    listSumms={ listSumms }
                    saveSumm={ this.onAddSumm }
                    deleteSumm={ this.onDeleteSumm }
                    openInput={ () => this.closeListAndOpenInput() }
                    onOpen={ this.openListSumms }
                    onClose={ this.closeListSumms }
                />
            </div>
        )
    }
}