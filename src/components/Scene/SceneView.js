import React from "react";
import { connect } from "react-redux";
import scene from "../reducers/scene";

class SceneView extends React.Component {
  state = {};

  render() {
    const scenes = this.props.scenes;
    return <div />
  }
}

const mapStateToProps = state => {
  scene;
};

export default connect(mapStateToProps)(SceneView);
