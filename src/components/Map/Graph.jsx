import React from "react"
import { connect } from "react-redux"
import GraphView from "../../../lib/react-digraph/dist"
import GraphConfig from "./graph-config.js"
import { fetchScene } from "../../actions/scene"

const styles = {
  graph: {
    height: "100%",
    width: "100%"
  }
}

const NODE_KEY = "id"
const EMPTY_TYPE = "empty"

let initialStateGraph = {
  nodes: [],
  edges: []
}

export class Graph extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      graph: initialStateGraph,
      selected: {}
    }
    this.state.graph = this.props.graph.graph
  }

  componentWillReceiveProps(nextProps) {
    const { nodes, edges } = nextProps.graph.graph
    const previousEdges = this.state.graph.edges
    const previousNodes = this.state.graph.nodes
    if (previousEdges.length + previousNodes.length !== nodes.length + edges.length) {
      this.setState({ graph: nextProps.graph.graph })
    }
    if (this.props.scene.id != nextProps.scene.id) {
      this.setState({ selected: nodes.find(node => node.id == nextProps.scene.id) })
    }
  }

  getNodeIndex(searchNode) {
    return this.state.graph.nodes.findIndex(node => {
      return node[NODE_KEY] === searchNode[NODE_KEY]
    })
  }

  getEdgeIndex(searchEdge) {
    return this.state.graph.edges.findIndex(edge => {
      return (
        edge.source === searchEdge.source && edge.target === searchEdge.target
      )
    })
  }

  getViewNode = nodeKey => {
    const searchNode = {}
    searchNode[NODE_KEY] = nodeKey
    const i = this.getNodeIndex(searchNode)
    return this.state.graph.nodes[i]
  }

  onUpdateNode = viewNode => {
    const graph = this.state.graph
    const i = this.getNodeIndex(viewNode)

    graph.nodes[i] = viewNode
    this.setState({ graph: graph })
  }

  onSelectNode = viewNode => {
    if (!!viewNode) {
      this.setState({ selected: viewNode })
      this.props.dispatch(fetchScene(this.state.selected.id))
    } else {
      this.setState({ selected: {} })
    }
  }

  render() {
    const nodes = this.state.graph.nodes
    const edges = this.state.graph.edges
    const selected = this.state.selected
    const NodeTypes = GraphConfig.NodeTypes
    const NodeSubtypes = GraphConfig.NodeSubtypes
    const EdgeTypes = GraphConfig.EdgeTypes

    return (
      <div id="graph" style={styles.graph}>
        <GraphView
          ref={el => (this.GraphView = el)}
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
          onUpdateNode={this.onUpdateNode}
        />
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Graph)
