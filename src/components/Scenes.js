import React from 'react';
import {connect} from 'react-redux'
import {fetchScenes} from '../actions/scenes'
import CurrentScene from './CurrentScene'
import SceneDisplayBar from './SceneDisplayBar'



class Scenes extends React.Component {

  state = {
    name : "",
    currentScene: 0,
  }

  componentDidMount() {
    this.props.dispatch(fetchScenes())
  }

  handleChange(e) {
    this.setState({[e.target.name] : e.target.value})
  }

  submit() {
  }

  render() {
    const scenes = this.props.scenes
    console.log(scenes)
    return (
      <div className="columns">
        <div className="column is-1">
        </div>
        <input placeholder="scene name" className="input column is-6" type="text" name="name" onChange={this.handleChange.bind(this)}/>
        <input className="button scene-create-button" type="submit" onClick={this.submit.bind(this)} value="Create"/>
        {this.curentScene && <CurrentScene />}
        <SceneDisplayBar scenes={scenes} />
      </div>
    )
  }
  
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Scenes)