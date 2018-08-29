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
      <h2 className="title is-2">{name}</h2>
      <h4 className="title is-4">Scene description:</h4>
      <h6 className="subtitle">{description}</h6> 
      </div>
    )
  }
}

const mapStateToProps = state => state


export default connect(mapStateToProps)(SceneView)
