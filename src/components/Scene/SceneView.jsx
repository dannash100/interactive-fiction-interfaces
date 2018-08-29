import React from "react";
import { connect } from "react-redux";
import TextField from "./TextField.jsx";
import Button from "@material-ui/core/Button";

class SceneView extends React.Component {
  state = {
    active: ""
  };
  constructor(props) {
    super(props);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.scene.id != this.props.scene.id) this.resetFields();
  }

  toggleEdit(activeField) {
    this.setState({ active: activeField });
  }

  resetFields() {
    this.setState({ active: "" });
  }

  render() {
    const { name, description } = this.props.scene;
    const { active } = this.state;
    return (
      <div className="scene">
        <h2 className="title is-2">{name}</h2>
        {active == "description" ? (
          <TextField description={description} />
        ) : description ? (
          <div onClick={() => this.toggleEdit("description")}>
            <h4 className="title is-4">Scene description:</h4>
            <h6 className="subtitle">{description}</h6>
          </div>
        ) : (
          <Button onClick={() => this.toggleEdit("description")}>
            Add description
          </Button>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(SceneView);
