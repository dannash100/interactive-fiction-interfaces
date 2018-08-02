import React from 'react';
import { connect } from 'react-redux';
import GraphView from '../../lib/react-digraph/dist'
import GraphConfig from './graph-config.js'
import {fetchScene} from '../actions/scene'

const styles = {
  graph: {
    height: '100%',
    width: '100%'
  }
};

const NODE_KEY = "id"
const EMPTY_TYPE = "empty";


let graphData = {
  nodes:
    [{ id: 1, title: 'test', x: 0, y: 0, type: 'special' },
    { id: 2, title: 'test', x: 0, y: -400, type: 'empty' },
    { id: 3, title: 'test', x: 400, y: -800, type: 'empty' }],
  edges:
    [{ source: 1, target: 2, type: 'specialEdge' },
    { source: 2, target: 3, type: 'specialEdge' }]
}

export class Graph extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      graph: graphData,
      selected: {}
    }
  }


  componentDidMount() {
    this.setState({ graph: this.props.graph.graph })
  }

  getNodeIndex(searchNode) {
    return this.state.graph.nodes.findIndex((node) => {
      return node[NODE_KEY] === searchNode[NODE_KEY]
    })
  }

  getEdgeIndex(searchEdge) {
    return this.state.graph.edges.findIndex((edge) => {
      return edge.source === searchEdge.source &&
        edge.target === searchEdge.target
    })
  }

  getViewNode = nodeKey => {
    const searchNode = {};
    searchNode[NODE_KEY] = nodeKey;
    const i = this.getNodeIndex(searchNode);
    return this.state.graph.nodes[i]
  }

  onUpdateNode = viewNode => {
    const graph = this.state.graph;
    const i = this.getNodeIndex(viewNode);

    graph.nodes[i] = viewNode;
    this.setState({ graph: graph });
  }

  onSelectNode = viewNode => {
    if (!!viewNode) {
      this.setState({ selected: viewNode });
      this.props.dispatch(fetchScene(this.state.selected.id))
    } else {
      this.setState({ selected: {} });
    }

  }

  render() {
    const nodes = this.state.graph.nodes;
    const edges = this.state.graph.edges;
    const selected = this.state.selected;
    const NodeTypes = GraphConfig.NodeTypes;
    const NodeSubtypes = GraphConfig.NodeSubtypes;
    const EdgeTypes = GraphConfig.EdgeTypes;

    return (
      <div id='graph' style={styles.graph}>

        <GraphView
          ref={(el) => this.GraphView = el}
          nodeKey={NODE_KEY}
          emptyType={EMPTY_TYPE}
          nodes={nodes}
          edges={edges}
          selected={selected}
          nodeTypes={NodeTypes}
          nodeSubtypes={NodeSubtypes}
          edgeTypes={EdgeTypes}
          enableFocus={true}
          getViewNode={this.getViewNode}
          onSelectNode={this.onSelectNode}
          onUpdateNode={this.onUpdateNode} />
      </div>
    );
  }

}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Graph)