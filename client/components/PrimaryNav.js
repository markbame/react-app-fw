import React, { Component } from 'react'

import { createJunction } from 'junctions'
import { Link } from 'react-junctions'
import styles from './PrimaryNav.css'

class PrimaryNav extends Component {
  tabs(props) {
    return props.navigation_tabs.map(tabs => (
      <li key={tabs}>
        <Link to={{ pathname: '/' + tabs }}>{tabs}</Link>
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
export default PrimaryNav
