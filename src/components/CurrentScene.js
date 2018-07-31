import React from 'react';
import { connect } from 'react-redux'



class CurrentScene extends React.Component {

  state = {
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <div className="columns">
        <h1>hey</h1>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(CurrentScene)