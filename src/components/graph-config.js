import React from "react";

const EmptyShape = (
  <symbol className="circle" viewBox="0 0 100 100" id="empty">
    <circle
      stroke="black"
      stroke-width="0.8"
      className="circle"
      cx="50"
      cy="50"
      r="48"
    />
  </symbol>
);

const SpecialShape = (
  <symbol viewBox="0 0 100 100" id="special">
    <rect transform="translate(50) rotate(45)" width="70" height="70" />
  </symbol>
);

const SpecialChildShape = (
  <symbol viewBox="0 0 100 100" id="specialChild">
    <rect
      x="2.5"
      y="0"
      width="95"
      height="97.5"
      fill="rgba(30, 144, 255, 0.12)"
    />
  </symbol>
);

const EmptyEdgeShape = (
  <symbol viewBox="0 0 50 50" id="emptyEdge">
    <circle cx="25" cy="25" r="8" fill="currentColor">
      {" "}
    </circle>
  </symbol>
);

const SpecialEdgeShape = <symbol viewBox="0 0 50 50" id="specialEdge" />;

export default {
  NodeTypes: {
    empty: {
      typeText: "",
      shapeId: "#empty",
      shape: EmptyShape
    },
    special: {
      typeText: "Start",
      shapeId: "#empty",
      shape: EmptyShape
    }
  },
  NodeSubtypes: {
    specialChild: {
      shapeId: "#specialChild",
      shape: SpecialChildShape
    }
  },
  EdgeTypes: {
    emptyEdge: {
      shapeId: "#emptyEdge",
      shape: EmptyEdgeShape
    },
    specialEdge: {
      shapeId: "#specialEdge",
      shape: SpecialEdgeShape
    }
  }
};
