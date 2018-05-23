import HeadBlock from './containers/HeadBlock'
import ChartMain from './containers/ChartMain'
import ShowErrors from './containers/ShowErrors'

const MainPage = () =>
	<div className='App'>
		<HeadBlock />
		<ChartMain />
		<ShowErrors />
	</div>

export default MainPage