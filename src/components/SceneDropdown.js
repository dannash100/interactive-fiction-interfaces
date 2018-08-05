import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import {toLink, availableDirections} from "../actions/create"

class SceneDropdown extends React.Component {
  state = {
    anchorEl: null,
    scene: "",
    id: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (sceneId, sceneName) => {
    if (sceneName !== "backdropClick") {
      const {nodes} = this.props.graph.graph
      this.setState({
        scene: sceneName,
        id: sceneId
      })
      this.props.dispatch(toLink(sceneId))
      this.props.dispatch(availableDirections(nodes.find(scene => scene.id === sceneId)))
    }
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { scenes } = this.props;
    return (
      <div className="scene-dropdown">
      <p>connected to </p>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
        {this.state.scene ? this.state.scene : "Select"}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {scenes.map(scene => {
            return <MenuItem onClick={() => this.handleClose(scene.id, scene.name)}>{scene.name}</MenuItem>
          })}
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(SceneDropdown);
