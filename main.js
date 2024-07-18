import "./style.css";

const clusters = [
  [3, 5, 10, 11],
  [55, 60, 62],
];
const clustersMapping = {
  3: clusters[0],
  5: clusters[0],
  10: clusters[0],
  11: clusters[0],
  55: clusters[1],
  60: clusters[1],
  62: clusters[1],
};

// add element with value 13
const absolutDistance = 5;
const valueToAdd = 13;

function findClusterForValue(value) {
  let foundCluster = null;
  let searchValue = value - absolutDistance;
  while (!foundCluster) {
    if (clustersMapping[searchValue]) {
      foundCluster = clustersMapping[searchValue];
    } else {
      searchValue++;
    }
    if (searchValue > value + 5) {
      break;
    }
  }
  return foundCluster;
}

function addToCluster(value) {
  if(!isNaN(value)){
    const foundCluster = findClusterForValue(value);
    if (foundCluster) {
      if (foundCluster.includes(value)) {
        return "value already in cluster";
      }
      foundCluster.push(value);
      clustersMapping[value] = foundCluster;
      rebuildCluster(foundCluster);
    } else {
      addNewCluster(value);
    }

    return foundCluster;
  }
}

function removeFromCluster(value) {
  if(!isNaN(value)){
    const foundCluster = findClusterForValue(value);
    if (foundCluster) {
      const indexOfValueInCluster = foundCluster.indexOf(value);
      foundCluster.splice(indexOfValueInCluster, 1);
      delete clustersMapping[value];
    } else {
      return "no such value in clusters";
    }
    return foundCluster;
  }
}

function rebuildCluster(cluster) {
  cluster.sort(function (a, b) {
    return a - b;
  });
}

function addNewCluster(value) {
  const newCluster = [value];
  clusters.push(newCluster);
  const indexOfCluster = clusters.indexOf(newCluster);
  clustersMapping[value] = clusters[indexOfCluster];
  return newCluster
}

