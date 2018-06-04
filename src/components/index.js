import MonitorIndicators from './containers/MonitorIndicators'
import MonitorChart from './containers/MonitorChart'
import ShowNotification from './containers/ShowNotification'
import ShowErrors from './containers/ShowErrors'

const MainPage = () =>
	<div className='App'>
		<MonitorIndicators />
		<MonitorChart />
		<ShowNotification />
		<ShowErrors />
	</div>

export default MainPage