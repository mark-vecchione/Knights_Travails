class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
      this.root = this.buildTree(array);
    }
  
    buildTree(array) {
      // Remove duplicates and sort the array
      const uniqueSorted = [...new Set(array)].sort((a, b) => a - b);
      
      // Helper function to build a balanced tree recursively
      const buildBalancedTree = (arr, start, end) => {
        if (start > end) return null;
        
        const mid = Math.floor((start + end) / 2);
        const node = new Node(arr[mid]);
        
        node.left = buildBalancedTree(arr, start, mid - 1);
        node.right = buildBalancedTree(arr, mid + 1, end);
        
        return node;
      };
      
      return buildBalancedTree(uniqueSorted, 0, uniqueSorted.length - 1);
    }
  
    insert(value) {
      const insertNode = (node, value) => {
        if (node === null) return new Node(value);
        
        if (value < node.data) {
          node.left = insertNode(node.left, value);
        } else if (value > node.data) {
          node.right = insertNode(node.right, value);
        }
        // If value is equal to node.data, we don't insert (no duplicates)
        
        return node;
      };
      
      this.root = insertNode(this.root, value);
    }
  
    deleteItem(value) {
      const removeNode = (node, value) => {
        // Base case: If tree is empty
        if (node === null) return null;
        
        // Navigate to the node to delete
        if (value < node.data) {
          node.left = removeNode(node.left, value);
          return node;
        } else if (value > node.data) {
          node.right = removeNode(node.right, value);
          return node;
        }
        
        // Value matches, this is the node to delete
        
        // Case 1: Node is a leaf (no children)
        if (node.left === null && node.right === null) {
          return null;
        }
        
        // Case 2: Node has only one child
        if (node.left === null) {
          return node.right;
        } else if (node.right === null) {
          return node.left;
        }
        
        // Case 3: Node has two children
        // Find the smallest value in the right subtree
        let successor = node.right;
        while (successor.left !== null) {
          successor = successor.left;
        }
        
        // Replace the node's value with the successor's value
        node.data = successor.data;
        
        // Delete the successor
        node.right = removeNode(node.right, successor.data);
        
        return node;
      };
      
      this.root = removeNode(this.root, value);
    }
  
    find(value) {
      let current = this.root;
      
      while (current !== null) {
        if (value === current.data) {
          return current;
        } else if (value < current.data) {
          current = current.left;
        } else {
          current = current.right;
        }
      }
      
      return null; // Value not found
    }
  
    // Breadth-first traversal
    levelOrder(callback) {
      if (!callback) {
        throw new Error("Callback function is required");
      }
      
      if (this.root === null) return;
      
      const queue = [this.root];
      
      while (queue.length > 0) {
        const node = queue.shift();
        callback(node);
        
        if (node.left !== null) queue.push(node.left);
        if (node.right !== null) queue.push(node.right);
      }
    }
  
    // Recursive implementation of levelOrder
    levelOrderRecursive(callback) {
      if (!callback) {
        throw new Error("Callback function is required");
      }
      
      const height = this.height(this.root);
      
      for (let level = 0; level <= height; level++) {
        this.processLevel(this.root, level, callback);
      }
    }
    
    processLevel(node, level, callback) {
      if (node === null) return;
      
      if (level === 0) {
        callback(node);
      } else {
        this.processLevel(node.left, level - 1, callback);
        this.processLevel(node.right, level - 1, callback);
      }
    }
  
    // Left -> Root -> Right
    inOrder(callback) {
      if (!callback) {
        throw new Error("Callback function is required");
      }
      
      const traverse = (node) => {
        if (node === null) return;
        
        traverse(node.left);
        callback(node);
        traverse(node.right);
      };
      
      traverse(this.root);
    }
  
    // Root -> Left -> Right
    preOrder(callback) {
      if (!callback) {
        throw new Error("Callback function is required");
      }
      
      const traverse = (node) => {
        if (node === null) return;
        
        callback(node);
        traverse(node.left);
        traverse(node.right);
      };
      
      traverse(this.root);
    }
  
    // Left -> Right -> Root
    postOrder(callback) {
      if (!callback) {
        throw new Error("Callback function is required");
      }
      
      const traverse = (node) => {
        if (node === null) return;
        
        traverse(node.left);
        traverse(node.right);
        callback(node);
      };
      
      traverse(this.root);
    }
  
    height(node) {
      if (node === null) return -1;
      
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
      
      return Math.max(leftHeight, rightHeight) + 1;
    }
  
    depth(node) {
      if (node === null) return -1;
      
      let depth = 0;
      let current = this.root;
      
      while (current !== null) {
        if (node.data === current.data) {
          return depth;
        } else if (node.data < current.data) {
          current = current.left;
        } else {
          current = current.right;
        }
        depth++;
      }
      
      return -1; // Node not found
    }
  
    isBalanced() {
      const checkBalance = (node) => {
        if (node === null) return true;
        
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        
        if (Math.abs(leftHeight - rightHeight) > 1) {
          return false;
        }
        
        return checkBalance(node.left) && checkBalance(node.right);
      };
      
      return checkBalance(this.root);
    }
  
    rebalance() {
      const values = [];
      
      // Collect all values using inOrder traversal
      this.inOrder((node) => {
        values.push(node.data);
      });
      
      // Rebuild the tree with these values
      this.root = this.buildTree(values);
    }
  }
  
  // prettyPrint
  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };


