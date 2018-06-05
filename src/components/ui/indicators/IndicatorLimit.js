import { Component } from 'react'
import classNames from 'classnames'

import RaisedButton from 'material-ui/RaisedButton'

import { COLORS_LIMITS as COLORS } from '../../../constants'

export default class IndicatorLimit extends Component {

	constructor() {
		super()
		this.state = {
			updated: false
		 }
    }

    componentDidMount() {
		this.activeUpdated()
	}

    componentDidUpdate(prevProps) {
		if (prevProps.label !== this.props.label) {
			this.activeUpdated()
		}
	}
    
    handleOpenLimitInfo(name) {
        this.props.onOpenLimitInfo(name)
    }

    activeUpdated() {
        this.setState({ updated: true })
        
		setTimeout(() => {
			this.setState({ updated: false })
		}, 1000)
	}

	render() {

        const { updated } = this.state,
            { name, label } = this.props,
            nameButton = `btn_${name}`,
            animationUpdated = classNames({ 'animationUpdated': updated })

		return (
			<RaisedButton 
				className={`Limit__button ${nameButton} ${animationUpdated}`}
				label={ label } 
				backgroundColor={ COLORS[name] }
				labelColor={ COLORS.labelButton } 
				onClick={ () => this.handleOpenLimitInfo(name) }
			/>
		)
	}
}