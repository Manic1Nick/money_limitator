import HeadBlock from './containers/HeadBlock'
import LimitsBlock from './containers/LimitsBlock'
import Chart from './containers/Chart'
import ShowErrors from './containers/ShowErrors'

const MainPage = () =>
	<div className='App'>
		<HeadBlock />
		<LimitsBlock />
		<Chart />
		<ShowErrors />
	</div>

export default MainPage