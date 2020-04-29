const graph = {
  H: {
    A: 3,
    B: 2,
    C: 5,
  },
  A: {
    H: 3,
    D: 3,
  },
  B: {
    H: 2,
    D: 1,
    E: 6,
  },
  C: {
    H: 5,
    E: 2,
  },
  D: {
    A: 3,
    F: 4,
  },
  E: {
    F: 1,
    S: 4,
  },
  F: {
    E: 1,
    D: 4,
    F: 2,
  },
  S: {
    F: 2,
    E: 4,
  },
};

function arrayInside(array, insideArray) {
    let contains = true;
    insideArray.forEach((e) => {
      if (!array.includes(e)) contains = false;
    });
    return contains;
  }
  
  console.log("The Path", graph);
  
  function minorPath(graph, start, goal) {
    let queue = [[[start], 0]];
    let allPaths = false;
  
    while (!allPaths) {
      queue.forEach((q, i) => {
        const qAux = [...q[0]];
        const n = qAux[qAux.length - 1];
  
        if (n != goal) {
          let firstPathOfNode = true;
          const auxPathValue = q[1];
  
          const possiblePaths = Object.keys(graph[n]);
  
          if (!arrayInside(qAux, possiblePaths)) {
            possiblePaths.forEach((x) => {
              if (!qAux.includes(x)) {
                if (firstPathOfNode) {
                  queue[i][0].push(x);
                  queue[i][1] += graph[n][x];
                  firstPathOfNode = false;
                } else {
                  queue.push([[...qAux, x], auxPathValue + graph[n][x]]);
                }
              }
            });
          } else queue.splice(i, 1);
        }
      });
  
      // console.log("OutForEach", queue);
  
      let checkAllPaths = true;
  
      queue.forEach((q) => {
        const qPath = q[0];
        if (qPath[qPath.length - 1] !== goal) checkAllPaths = false;
      });
  
      allPaths = checkAllPaths;
    }
  
    let minorPathIndex = 0;
  
    console.log("All Paths", queue);
  
    queue.forEach((x, i) => {
      if (x[1] < queue[minorPathIndex][1]) minorPathIndex = i;
    });
  
    return queue[minorPathIndex];
  }
  
  console.log("The Minor Path", minorPath(graph, "A", "C"));