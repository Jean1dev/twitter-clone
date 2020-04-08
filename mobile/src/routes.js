import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation'

import Login from './pages/login'
import Timeline from './pages/Timeline'
import New from './pages/newTweet'

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        App: createStackNavigator({
            Timeline,
            New    
        })
    })
)

export default Routes