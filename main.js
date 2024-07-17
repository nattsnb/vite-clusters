import "./style.css";

const clusters = [
    [3, 5, 10, 11],
    [55, 60, 62]
]
const clustersMapping = {
    3: clusters[0],
    5: clusters[0],
    10: clusters[0],
    11: clusters[0],
    55: clusters[1],
    60: clusters[1],
    62: clusters[1],
}

// add element with value 13
const absolutDistance = 5;
const valueToAdd = 13;

function findClusterForValue(value) {
    let foundCluster = null
    let searchValue = value - absolutDistance;

    while(!foundCluster) {
        if(clustersMapping[searchValue]) {
            foundCluster = clustersMapping[searchValue];
        } else {
            searchValue++;
        }
        if(searchValue > value + 5) {
            break;
        }
    }
    return foundCluster;
}

function addToCluster(value) {
    const foundCluster = findClusterForValue(value);

    if (foundCluster) {
        if(foundCluster.includes(value)){
            return "value already in cluster"
        }
        foundCluster.push(value);
        clustersMapping[value] = foundCluster;
        console.log(clustersMapping)
    }

    return foundCluster;
}

function removeFromCluster(value) {
    const foundCluster = findClusterForValue(value);

    if (foundCluster) {
        const indexOfValueInCluster = foundCluster.indexOf(value)
        foundCluster.splice(indexOfValueInCluster,1)
        delete clustersMapping[value]
    } else {
        return "no such value in clusters"
    }

    return foundCluster;
}

addToCluster(valueToAdd)
addToCluster(82)
addToCluster(62)
addToCluster(83)
addToCluster(58)
addToCluster(12)
addToCluster(62)
removeFromCluster(62)

