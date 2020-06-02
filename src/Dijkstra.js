import { StatusTypes } from './components/Pathfinding/Element';


export function Solve(elementArray, startIndex, endIndex) {
    const arraySize = elementArray.length;
    let unvisitedElements = [];
    for (let i = 0; i < arraySize; i++) {
        let row = [];
        for (let j = 0; j < arraySize; j++) {
            row.push(Number.MAX_SAFE_INTEGER);
        }
        unvisitedElements.push(row);
    }

    let currentNode = [startIndex[0], startIndex[1]];
    unvisitedElements[currentNode[0]][currentNode[1]] = 0;
    while (currentNode) {
        let neighbors = FindNeighbors(currentNode.props.position, unvisitedElements);
        for (let i = 0; i < neighbors.length; i++) {
            const neighbor = neighbors[i];
            if (neighbor.state.Status === StatusTypes.WALL) {
                unvisitedElements[neighbor.props.position[0]][neighbor.props.position[1]] = null;
            } else if (neighbor.state.Distance > currentNode.state.Distance + 1) {
                neighbor.setDistance(currentNode.state.Distance + 1);
            }
        }
        unvisitedElements[currentNode.props.position[0]].props.children[currentNode.props.position[1]] = null;
        if (!unvisitedElements[endIndex[0]].props.children[endIndex[1]]) {
            let nodePath = GetSolvePath(elementArray, endIndex);
            return nodePath.reverse();
        } else {
            currentNode = FindSmallestDistanceNode(unvisitedElements);
        }
    }

    return null;
}

function FindNeighbors(position, elements) {
    let neighbors = [];

    // Check north
    let northValue = elements[position[0]][position[1] - 1];
    if (northValue) {
        neighbors.push(northValue)
    }
    // Check east
    let eastValue = elements[position[0] + 1][position[1]];
    if (eastValue) {
        neighbors.push(eastValue)
    }
    // Check south
    let southValue = elements[position[0]][position[1] + 1];
    if (southValue) {
        neighbors.push(southValue)
    }
    // Check west
    let westValue = elements[position[0] - 1][position[1]];
    if (westValue) {
        neighbors.push(westValue)
    }
    return neighbors;
}

function FindSmallestDistanceNode(elements) {
    let node = elements[0];
    for (let element in elements) {
        if (element.state.Distance < node.state.Distance) {
            node = element;
        }
    }
    return node;
}

function GetSolvePath(elementArray, endIndex) {
    let nodePath = [];
    let node = elementArray[endIndex[0]][endIndex[1]];
    while (node) {
        let neighbors = FindNeighbors(node.props.position);
        let smallestNode = FindSmallestDistanceNode(neighbors);
        nodePath.push(smallestNode);
        node = smallestNode;
    }

    return nodePath;
}
