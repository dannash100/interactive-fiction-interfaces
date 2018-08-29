import React from 'react'
import TextField from '@material-ui/core/TextField';

class TextFields extends React.Component {
    state = {
      multiline: this.props.description,
    };
  
    handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });
    };
  
    render() {
  
      return (
        <form noValidate autoComplete="off">
          <TextField
            id="multiline-flexible"
            label="Description"
            multiline
            rowsMax="10"
            value={this.state.multiline}
            onChange={this.handleChange('multiline')}
            margin="normal"
          />
        </form>
      );
    }
  }
  
  
  export default TextFields
  