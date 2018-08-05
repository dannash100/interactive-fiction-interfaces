import React from "react";
import { connect } from "react-redux";
import { newScene, fetchScene } from "../actions/scene";
import { fetchScenes } from "../actions/scenes";
import { fetchGraph } from "../actions/graph";
import SceneDropdown from "./SceneDropdown";
import DirectionDropdown from "./DirectionDropdown";

class Scenes extends React.Component {
  state = {
    name: "",
  };

  componentDidMount() {
    this.props.dispatch(fetchScenes());
    this.props.dispatch(fetchGraph());
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submit() {
    let sceneName = { name: this.state.name };
    const {linkId, linkDirection} = this.props.create
    this.props.dispatch(newScene(sceneName, linkId, linkDirection));
  }

  render() {
    if (this.props.scene.currentSceneId)
      this.props.dispatch(fetchScene(this.props.scene.currentSceneId));
    console.log(this.props);
    const { name } = this.state
    const { linkId, linkDirection } = this.props.create
    return (
      <div className="columns scenes">
        <input
          placeholder="scene name"
          className="input column is-6"
          type="text"
          name="name"
          onChange={this.handleChange.bind(this)}
          value={this.state.name}
        />
        <SceneDropdown />
        <DirectionDropdown />
        <input
          className={`button scene-create-button ${name.length > 0 && linkId && linkDirection ? "raise" : "disabled"}`}
          type="submit"
          onClick={this.submit.bind(this)}
          value="Create"
        />
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Scenes);
