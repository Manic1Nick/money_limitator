import ChartLimits from '../charts/ChartLimits'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

const DialogBalanceInfo = ({ open=false, limits={}, closeDialog=f=>f }) => {
    
    const actions = [
        <FlatButton
            label="Ok"
            primary={true}
            onClick={ () => closeDialog() }
        />
    ]
    
    return(
        <Dialog
            className='Dialog'
            open={ open }
            title='Limits info'
            actions={ actions }
            modal={ false }
            onRequestClose={ () => closeDialog() }
        >
            <ChartLimits
                limits={ limits }
            />
        </Dialog>
    )
}

export default DialogBalanceInfo
