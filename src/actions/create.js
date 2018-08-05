
export const TO_LINK = "TO_LINK"
export const TO_LINK_DIRECTION = "TO_LINK_DIRECTION"
export const AVAILABLE_DIRECTIONS = "AVAILABLE_DIRECTIONS"

export const toLink = (linkId, linkName) => {
    return {
      type: TO_LINK,
      linkId,
      linkName
    }
  }

export const toLinkDirection = (direction) => {
    return {
      type: TO_LINK_DIRECTION,
      direction
    }
}

export const availableDirections = (scene) => {
    return {
        type: AVAILABLE_DIRECTIONS,
        scene
    }
}
