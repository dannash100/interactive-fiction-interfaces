import React from "react"
import Button from "@material-ui/core/Button"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import { connect } from "react-redux"

class SelectionDropdown extends React.Component {
  state = {
    anchorEl: null,
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = (option, clickType) => {
    if (clickType !== "backdropClick") {
      this.props.dispatch(action(option))
    }
    this.setState({ anchorEl: null})
  }

  render() {
    const { anchorEl } = this.state;
    const { options, message, action, field } = this.props.create;
    return (
      <div className="scene-dropdown">
      <p className="subtitle">{message}</p>
        <Button
          className={options.length > 0 ? "" : "disabled"}
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
        {this.props.create[field] ? this.props.create[field] : "Select"}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {options && options.length > 0 ? options.map(option => {
            return <MenuItem onClick={() => this.handleClose(option)}>{option}</MenuItem>
          }) : <MenuItem className="disabled has-text-danger has-text-weight-semibold">Nothing available</MenuItem>}
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(SelectionDropdown);
