import React from 'react';
import { connect } from 'react-redux'
import { newScene, fetchScene } from '../actions/scene'
import { fetchScenes } from '../actions/scenes'
import { fetchGraph } from '../actions/graph'
import SceneDisplayBar from './SceneDisplayBar'



class Scenes extends React.Component {

  state = {
    name: "",

  }

  componentDidMount() {
    this.props.dispatch(fetchScenes())
    this.props.dispatch(fetchGraph())
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  submit() {
    let sceneName = {name: this.state.name}
    this.props.dispatch(newScene(sceneName))
  }

  render() {
    if (this.props.scene.currentSceneId) this.props.dispatch(fetchScene(this.props.scene.currentSceneId))
    const scenes = this.props.scenes
    console.log(this.props)
    return (
      <div className="columns scenes">
        <input placeholder="scene name" className="input column is-6" type="text" name="name" onChange={this.handleChange.bind(this)} />
        <input className={`button scene-create-button is-pulled-right ${this.state.name.length > 0 ? 'raise' : 'disabled'}` }type="submit" onClick={this.submit.bind(this)} value="Create" />
        <SceneDisplayBar scenes={scenes} />
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Scenes)