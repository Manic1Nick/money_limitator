import HeadBlock from './containers/HeadBlock'
import Chart from './containers/Chart'
import ShowErrors from './containers/ShowErrors'

const MainPage = () =>
	<div className='App'>
		<HeadBlock />
		<Chart />
		<ShowErrors />
	</div>

export default MainPage