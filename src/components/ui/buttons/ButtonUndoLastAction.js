import { Component } from 'react'
import classNames from 'classnames'

import UndoIcon from 'react-material-icons/icons/content/undo'
import IconButton from 'material-ui/IconButton'

import { COLORS_ICONS as COLORS } from '../../../constants'

export default class ButtonUndoLastAction extends Component {

    constructor() {
        super()
        this.state = { animate: false }
    }

    componentDidMount() {
        this._activeAnimate()
    }

    render() {
        const { animate } = this.state,
            { onUndo } = this.props
        
        const styles = {
            icon: { color: COLORS.undo },
            tooltip: { top: '30px' }
        }

        let animated = classNames({ 'animationActionsEditor': animate })

        return(
            <IconButton 
                className={`icon__button ${animated}`}
                tooltip='Undo last action' 
                tooltipStyles={ styles.tooltip }
            >
                <UndoIcon 
                    className='icon'
                    style={ styles.icon }
                    onClick={ onUndo }
                />
            </IconButton>
        )
    }

    _activeAnimate = () => {

        setTimeout(() => {
            this.setState({ animate: true })
        }, 1000)

        setTimeout(() => {
            this.setState({ animate: false })
        }, 2000)
    }
}