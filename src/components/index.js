import HeadBlock from './containers/HeadBlock'
import ChartBlock from './containers/ChartBlock'
import ShowNotification from './containers/ShowNotification'
import ShowErrors from './containers/ShowErrors'

const MainPage = () =>
	<div className='App'>
		<HeadBlock />
		<ChartBlock />
		<ShowNotification />
		<ShowErrors />
	</div>

export default MainPage