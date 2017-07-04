import React, { Component } from 'react'
import { createJunction } from 'junctions'
import { Link } from 'react-junctions'
import SecondaryNav from '../components/SecondaryNav'

const junction = createJunction({
  Activity: {
    path: '/activity'
  },
  News: {
    path: '/news'
  },
  Events: {
    path: '/events'
  }
})

class Home extends Component {
  static junction = junction
  render() {
    const route = this.props.route
    return (
      <div>
        <SecondaryNav
          junction={junction}
          locate={this.props.locate}
          navigation_tabs={['Activity', 'News', 'Events']}
        />
        {route &&
          <div>
            {route.key} <small>{route.params.homeId}</small>
          </div>}
      </div>
    )
  }
}

export default Home
