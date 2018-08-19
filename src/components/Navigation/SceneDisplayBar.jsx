import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import { fetchScenes } from "../../actions/scenes";
import { fetchScene } from "../../actions/scene";

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
};

class SceneDisplayBar extends React.Component {
  state = {
    drawer: false
  };

  toggleDrawer = open => () => {
    this.props.dispatch(fetchScenes())
    this.setState({
      drawer: open
    })
  }

  selectScene(id) {
    this.props.dispatch(fetchScene(id))
  }

  render() {
    const { classes, scenes } = this.props;
    const sceneList = (
      <div className={classes.list}>
        <List>
          {scenes.map(scene => {
            return (
              <div>
                <ListItem button onClick={() => this.selectScene(scene.id)}>
                  <ListItemText primary={scene.name} />
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>
      </div>
    );

    return (
      <div>
        <Button onClick={this.toggleDrawer(true)}>Scene Menu</Button>

        <Drawer open={this.state.drawer} onClose={this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            {sceneList}
          </div>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(withStyles(styles)(SceneDisplayBar));
