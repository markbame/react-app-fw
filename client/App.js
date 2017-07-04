import React, { Component } from 'react'
import { connect } from 'react-redux'
import universal from 'react-universal-component'

import { createBrowserHistory, createMemoryHistory } from 'history'
import { createJunction } from 'junctions'
import { Link, Router } from 'react-junctions'

import TopLevelScreen from './components/TopLevelScreen'
import ModalScreen from './components/ModalScreen'
import PrimaryNavigation from './components/PrimaryNav.js'
import styles from './components/PrimaryNav.css'

import Home from './pages/Home'
import Notifications from './pages/Notifications'
import Create from './pages/Create'
import Groups from './pages/Groups'
import Profile from './pages/Profile'

import routeMain from '../routes/routeMain'

var history
if (typeof window !== 'undefined') {
  history = createBrowserHistory()
} else {
  history = createMemoryHistory()
}


const junction2 = routeMain.reduce((result, name, index) => {
       result[index]= name + ':{next:'+name+'.junction}'
       return result
},{})

const junction = createJunction({
  Notifications: {
    next: Notifications.junction
  },
  Create: {
    next: Create.junction
  },
  Groups: {
    next: Groups.junction
  },
  Profile: {
    next: Profile.junction
  },
  Home: {
    next: Home.junction,
    default: true
  }
})

class AppContent extends Component {

  renderRoute(route, locate) {
    switch (route && route.key) {
      case 'Home':
        return <Home route={route.next} locate={route.locate} />
      case 'Notifications':
        return <Notifications route={route.next} locate={route.locate} />
      case 'Create':
        return <Create route={route.next} locate={route.locate} />
      case 'Groups':
        return <Groups route={route.next} locate={route.locate} />
      case 'Profile':
        return <Profile route={route.next} locate={route.locate} />
      case undefined:
        return <h1>404</h1>
      default:
        return <h1>{route.key}</h1>
    }
  }

  render() {   console.log(junction2)
    return (
      <div>
        {this.renderRoute(this.props.route, this.props.locate)}
        <PrimaryNavigation
          navigation_tabs={[
            'home',
            'notifications',
            'create',
            'groups',
            'profile'
          ]}
        />
      </div>
    )
  }
}

const App = ({ navigation }) => {
  return (
    <Router
      history={history}
      junction={junction}
      render={<AppContent title="Junctions" />}
    />
  )
}

const mapStateToProps = state => {
  return {
    random: Math.random(),
    navigation: state.navigation
  }
}
const mapDispatchToProps = dispatch => ({})
export default connect(mapStateToProps, mapDispatchToProps)(App)
