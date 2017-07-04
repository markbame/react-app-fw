import React, { Component } from 'react'

import { createJunction } from 'junctions'
import { Link } from 'react-junctions'
import styles from './SecondaryNav.css'

class SecondaryNav extends Component {
  tabs(props) {
    return props.navigation_tabs.map(tabs => (
      <li key={tabs}>
        <Link to={props.locate(props.junction.createRoute(tabs))}>{tabs}</Link>
      </li>
    ))
  }
  render() {
    const props = this.props
    return (
      <ol className={styles.bar}>
        {this.tabs(props)}
      </ol>
    )
  }
}
export default SecondaryNav
