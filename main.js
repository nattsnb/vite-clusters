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
  combineClustersIfNeeded(value)
  deleteEmptyClusters()
  return foundCluster;
}

function deleteEmptyClusters(){
  for (let i = 0; i < clusters.length; i ++) {
    if (clusters[i].length === 0) {
      clusters.splice(i,1)
    }
  }
}

function combineClustersIfNeeded(value) {
  const allNumbersArray = clusters.flat();
  let i = -5
  let pickedNumbersArray = []
  while (i<5) {
    let numberToLookFor = value + i;
    for (const element of allNumbersArray){
      if (element === numberToLookFor) {
        pickedNumbersArray.push(element)
      }
    }
    i++
  }
  let arrayOfClusters = []
  for (const element of pickedNumbersArray) {
    const cluster = clustersMapping[element]
    arrayOfClusters.push(cluster)
  }
  const noDuplicatesArray = [...new Set (arrayOfClusters)]
  const combinedCluster = noDuplicatesArray.flat()
  for (const element of noDuplicatesArray) {
    const index = clusters.indexOf(element)
    clusters.splice(index,1)
  }
  for (const element of combinedCluster) {
    clustersMapping[element] = combinedCluster
  }
  clusters.push(combinedCluster)
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

function findInClusters(value){
  if (clustersMapping[value]) {
    return clustersMapping[value];
  } else {
    return null
  }
}

function rebuildMap(value, foundCluster){
  const index = clusters.findIndex(foundCluster)
  const otherClusters = clusters.splice(index, 1)

}


//TESTING
console.log(clusters)
addToCluster(13)
addToCluster(68)
addToCluster(111)
console.log(clusters)
addToCluster(65)
// console.log(findInClusters(13))
// removeFromCluster(11)
// addToCluster(22)
// removeFromCluster(111)
// console.log(clusters)
// console.log(findInClusters(60))
// console.log(findInClusters(111))
// console.log(clustersMapping)
// addToCluster(69)
// removeFromCluster(65)
console.log(clustersMapping)
console.log(clusters)

