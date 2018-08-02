
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class SceneDisplayBar extends React.Component {

  state = {
    drawer: false,
  };

  toggleDrawer = (open) => () => {
    this.setState({
      drawer: open,
    });
  };

  render() {
    const { classes, scenes } = this.props;
 
    const sceneList = (
      <div className={classes.list}>
        <List>
            {scenes.map(scene => {
                return (
                    <div>
                    <ListItem button>
                        <ListItemText primary={scene.name}/>
                    </ListItem>
                    <Divider />
                    </div>
                ) 
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
export default withStyles(styles)(SceneDisplayBar);