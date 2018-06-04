import { Component } from 'react'
import classNames from 'classnames'

import UndoIcon from 'react-material-icons/icons/content/undo'
import IconButton from 'material-ui/IconButton'

import { COLORS_ICONS as COLORS } from '../../../constants'

export default class ButtonUndoLastAction extends Component {

    constructor() {
        super()
        this.state = ({ created: false })
    }

    componentDidMount() {
        this._activeAnimate()
    }

    render() {
        const { created } = this.state,
            { onUndo } = this.props
        
        const styles = {
            icon: { color: COLORS.undo },
            tooltip: { top: '30px' }
        }

        let animateCreated = classNames({ 'animationCreated': created })

        return(
            <IconButton 
                className={`icon__button ${animateCreated}`}
                tooltip='Undo last action' 
                tooltipStyles={ styles.tooltip }
            >
                <UndoIcon 
                    className='icon'
                    style={ styles.icon }
                    onClick={ () => onUndo() }
                />
            </IconButton>
        )
    }

    _activeAnimate = () => {

        setTimeout(() => {
            this.setState({ created: true })
        }, 1000)

        setTimeout(() => {
            this.setState({ created: false })
        }, 2000)
    }
}