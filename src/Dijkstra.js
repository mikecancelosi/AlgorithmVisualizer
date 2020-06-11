import { StatusTypes } from './components/Pathfinding/PathfindingWindow';


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
        let neighbors = FindNeighbors(currentNode.position, unvisitedElements);
        for (let i = 0; i < neighbors.length; i++) {
            const neighbor = neighbors[i];
            if (neighbor.state.Status === StatusTypes.WALL) {
                unvisitedElements[neighbor.position[0]][neighbor.position[1]] = null;
            } else if (neighbor.distance > currentNode.distance + 1) {
                neighbor.distance = currentNode.distance + 1;
            }
        }
        unvisitedElements[currentNode.position[0]][currentNode.position[1]] = null;
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
        if (element.distance < node.distance) {
            node = element;
        }
    }
    return node;
}

function GetSolvePath(elementArray, endIndex) {
    let nodePath = [];
    let node = elementArray[endIndex[0]][endIndex[1]];
    while (node) {
        let neighbors = FindNeighbors(node.position);
        let smallestNode = FindSmallestDistanceNode(neighbors);
        nodePath.push(smallestNode);
        node = smallestNode;
    }

    return nodePath;
}
