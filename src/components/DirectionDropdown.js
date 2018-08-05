import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import {toLinkDirection} from "../actions/create"

class DirectionDropdown extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (direction, clickType) => {
    if (clickType !== "backdropClick") {
      this.props.dispatch(toLinkDirection(direction))
    }
    this.setState({ anchorEl: null});
  };

  render() {
    const { anchorEl } = this.state;
    const { availableDirections } = this.props.create;
    return (
      <div className="scene-dropdown">
      <p>by direction</p>
        <Button
          className={availableDirections ? "" : "disabled"}
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
        {this.props.create.linkDirection ? this.props.create.linkDirection : "Select"}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {availableDirections && availableDirections.map(direction => {
            return <MenuItem onClick={() => this.handleClose(direction)}>{direction}</MenuItem>
          })}
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(DirectionDropdown);
