import React, { Component } from 'react'
import { createJunction } from 'junctions'
import { Link } from 'react-junctions'
import SecondaryNav from '../components/SecondaryNav'

const junction = createJunction({
  Notifications: {
    path: '/notifications'
  }
})

class Notifications extends Component {
  static junction = junction
  render() {
    const route = this.props.route
    return (
      <div>
        <SecondaryNav
          junction={junction}
          locate={this.props.locate}
          navigation_tabs={['Notifications']}
        />
        {route &&
          <div>
            {route.key}
          </div>}
      </div>
    )
  }
}

export default Notifications
