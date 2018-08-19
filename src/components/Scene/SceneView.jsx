import React from "react"
import { connect } from "react-redux"

// options, message, action, field - feed to option drop down

class SceneView extends React.Component {
  state = {}

  render() {
    const {name, description} = this.props.scene
    console.log(name, description)
    return (
      <div className="scene">
      <p className="title is-2">{name}</p>
      <p className="title is-4">{description}</p>
      </div>
    )
  }
}

const mapStateToProps = state => state


export default connect(mapStateToProps)(SceneView)
