import { Component } from 'react'
import classNames from 'classnames'

import DrawerListSumms from '../DrawerListSumms'

import FlatButton from 'material-ui/FlatButton'
import { List, ListItem } from 'material-ui/List'

export default class IndicatorListSumms extends Component {

    constructor(props) {
        super()
        this.state = {
            listSummsOpening: false,
            updated: false
            //screenSize: props.screenSize
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     if (this.props.screenSize !== nextProps.screenSize) {
    //         this.setState({ screenSize: nextProps.screenSize })
	// 	}
    // }

    componentDidMount() {
        this.activeUpdated()
    }

    componentDidUpdate(prevProps) {
		if (prevProps.label !== this.props.label) {
			this.activeUpdated()
		}
	}

    openListSumms = () => {
        this.setState({ listSummsOpening: true })
    }

    closeListSumms = () => {
        this.setState({ listSummsOpening: false })
    }

    closeListAndOpenInput = (isExpense) => {
        this.setState({ listSummsOpening: false })
        this.props.inputNewSumm(isExpense)
    }

    activeUpdated() {
        this.setState({ updated: true })
        
		setTimeout(() => {
			this.setState({ updated: false })
		}, 1000)
    }

    render() {

        const { listName, label, listSumms, addSumm, deleteSumm, screenSize } = this.props

        const { updated, listSummsOpening } = this.state

        let animateUpdated = classNames({ 'animationUpdated': updated }),
            is_XS = screenSize === 'XS',
            labelStyle = is_XS ? { fontSize: '10px' } : {}

        return (
            <div className='ListSumms'>
                <FlatButton
                    className={`ListSumms ${animateUpdated}`}
                    label={ label }
                    onClick={ () => this.openListSumms() }
                    labelStyle={ labelStyle }
                />
                
                <DrawerListSumms
                    open={ listSummsOpening }
                    listName={ listName }
                    isExpenses={ listName === 'Expenses' }
                    listSumms={ listSumms }
                    saveSumm={ addSumm }
                    deleteSumm={ deleteSumm }
                    openInput={ this.closeListAndOpenInput }
                    onOpen={ this.openListSumms }
                    onClose={ this.closeListSumms }
                    is_XS={ is_XS }
                />
            </div>
        )
    }
}