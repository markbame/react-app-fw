import React, { Component } from 'react'
import { createJunction } from 'junctions'
import { Link } from 'react-junctions'
import SecondaryNav from '../components/SecondaryNav'

const junction = createJunction({
  Create: {
    path: '/create'
  }
})

class Create extends Component {
  static junction = junction
  render() {
    const route = this.props.route
    return (
      <div>
        <SecondaryNav
          junction={junction}
          locate={this.props.locate}
          navigation_tabs={['Create']}
        />
        {route &&
          <div>
            {route.key}
          </div>}
      </div>
    )
  }
}

export default Create
