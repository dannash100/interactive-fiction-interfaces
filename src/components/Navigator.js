import React from 'react';
import { connect } from 'react-redux'




class NewScene extends React.Component {

  state = {
  }


  render() {
    const scenes = this.props.scenes
    return (
      <div>
       
      </div>
    )
  }

}

const mapStateToProps = state => state

export default connect(mapStateToProps)(NewScene)