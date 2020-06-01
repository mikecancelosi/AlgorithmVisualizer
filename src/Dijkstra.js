import { StatusTypes } from './components/Pathfinding/Element';


function Solve(elementArray, startIndex, endIndex) {
    let unvisitedElements = this.state.elementArray.split();
    let currentNode = unvisitedElements[startIndex[0]][startIndex[1]];
    currentNode.state.distance = 0;
    while (currentNode) {
        let neighbors = FindNeighbors(currentNode.state.position, unvisitedElements);
        for (let i = 0; i < neighbors.length; i++) {
            const neighbor = neighbors[i];
            if (neighbor.state.Status === StatusTypes.WALL) {
                unvisitedNeighbors[neighbor.state.position[0]][neighbor.state.position[1]] = null;
            } else if (neighbor.state.distance > currentNode.state.distance + 1) {
                neighbor.state.distance = currentNode.state.distance + 1;
            }
        }
        unvisitedElements[currentNode.state.position[0]][currentNode.state.position[1]] = null;
        if (!unvisitedElements[endIndex[0]][endIndex[1]]) {
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
        if (element.state.distance < node.state.distance) {
            node = element;
        }
    }
    return node;
}

function GetSolvePath(elementArray, endIndex) {
    let nodePath = [];
    let node = elementArray[endIndex[0]][endIndex[1]];
    while (node) {
        let neighbors = FindNeighbors(node.state.position);
        let smallestNode = FindSmallestDistanceNode(neighbors);
        nodePath.push(smallestNode);
        node = smallestNode;
    }

    return nodePath;
}