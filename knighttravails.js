// Define knight's possible moves - relative coordinates
const KNIGHT_MOVES = [
    [2, 1], [1, 2], [-1, 2], [-2, 1],
    [-2, -1], [-1, -2], [1, -2], [2, -1]
  ];
  
  // Check if a position is valid on the board
  const isValidPosition = (x, y, boardSize = 8) => 
    x >= 0 && x < boardSize && y >= 0 && y < boardSize;
  
  // Convert position array to string for use as Map/Set keys
  const positionToString = (pos) => `${pos[0]},${pos[1]}`;
  
  //Find the shortest path for a knight from start to end position
  function knightMoves(start, end) {
    // Early validation
    if (!Array.isArray(start) || !Array.isArray(end) || 
        start.length !== 2 || end.length !== 2) {
      throw new Error("Invalid input: positions must be [x, y] arrays");
    }
    
    // Convert end to string for comparison
    const targetPosStr = positionToString(end);
    
    // Check if positions are valid
    if (!isValidPosition(start[0], start[1]) || !isValidPosition(end[0], end[1])) {
      throw new Error("Positions must be within the chess board (0-7)");
    }
    
    // Check if start and end are the same
    if (positionToString(start) === targetPosStr) {
      return [start]; // Already at destination
    }
    
    // Initialize BFS
    const queue = [];
    const visited = new Set();
    const pathMap = new Map(); // Maps positions to their previous position
    
    // Start BFS
    queue.push(start);
    visited.add(positionToString(start));
    pathMap.set(positionToString(start), null); // Start has no previous position
    
    while (queue.length > 0) {
      // Dequeue the current position
      const currentPos = queue.shift();
      const [currentX, currentY] = currentPos;
      
      // Generate all possible moves from current position
      for (const [dx, dy] of KNIGHT_MOVES) {
        const newX = currentX + dx;
        const newY = currentY + dy;
        const newPos = [newX, newY];
        const newPosStr = positionToString(newPos);
        
        // Skip if invalid or already visited
        if (!isValidPosition(newX, newY) || visited.has(newPosStr)) {
          continue;
        }
        
        // Add to queue and mark as visited
        queue.push(newPos);
        visited.add(newPosStr);
        pathMap.set(newPosStr, currentPos); // Track the path
        
        // Check if we've reached the target
        if (newPosStr === targetPosStr) {
          // Reconstruct the path
          return reconstructPath(pathMap, start, end);
        }
      }
    }
    
    return "No path found"; // Should never happen on a standard chess board
  }
  
  //Reconstruct the path from start to end using the path map
  function reconstructPath(pathMap, start, end) {
    const path = [];
    let current = end;
    
    // Work backwards from end to start
    while (current !== null) {
      path.unshift(current); // Add to beginning of array
      current = pathMap.get(positionToString(current)); // Get previous position
    }
    
    return path;
  }
  
  //Format and display the path
  function formatPath(path) {
    console.log(`=> You made it in ${path.length - 1} moves! Here's your path:`);
    path.forEach(position => {
      console.log(`   [${position[0]}, ${position[1]}]`);
    });
  }
  
  // Test cases
  console.log("Example 1: [0,0] to [3,3]");
  const path1 = knightMoves([0, 0], [3, 3]);
  formatPath(path1);
  
  console.log("\nExample 2: [3,3] to [0,0]");
  const path2 = knightMoves([3, 3], [0, 0]);
  formatPath(path2);
  
  console.log("\nExample 3: [0,0] to [7,7]");
  const path3 = knightMoves([0, 0], [7, 7]);
  formatPath(path3);
  
  console.log("\nAdditional Example: [3,3] to [4,3]");
  const path4 = knightMoves([3, 3], [4, 3]);
  formatPath(path4);
  