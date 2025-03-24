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
        //remove dupes and sort 
        const uniqueSorted = [...new Set(array)].sort((a,b) => a-b);

        // helper function to build balanced tree recursively
        const buildBalancedTree = (arr,start,end)=> {
            if(start > end) return null;

            const mid = Math.floor((start+end)/2);
            const node = new Node(arr[mid]);

            node.left = buildBalancedTree(arr, start, mid-1);
            node.right = buildBalancedTree(arr, mid+1, end);

            return node;
        };

        return buildBalancedTree(uniqueSorted, 0, uniqueSorted.length -1);
    }

    insert(value) {
        const insertNode = (node, value) => {
            if (node === null) return new Node(value);

            if(value < node.data) {
                node.left = insertNode(node.left,value);
            } else if (value > node.data) {
                node.right = insertNode(node.right,value);
            }
            //if value = node.data, don't insert, prevents dupes
            return node;
        };
        this.root = insertNode(this.root,value);
    }

    deleteItem(value) {
        const removeNode = (node,value) => {
            //Base case: tree is empty
            if (node === null) return null;

            //navigate to node for deletion
            if( value < node.data) {
                node.left = removeNode(node.left, value);
                return node;
            } else if (value > node.data) {
                node.right = removeNode(node.right,value);
                return node;
            }

            //value matches, this is the node to delete

            // Case 1: Node is a leaf sans children
            if (node.left === null && node.right === null) {
                return null;
            }

            //Case 2: Node has one child
            if(node.left===null) {
                return node.right;
            } else if(node.right === null){
                return node.left;
            }

            //Case 3: Node has two children
            // find the smallest value in the right subtree
            let successor = node.right;
            while(successor.left != null){
                successor = successor.left;
            }
            //Replace the node's value with the successor's value
            node.data = successor.data;

            //delete the successor
            node.right = removeNode(node.right,successor.data);
            return node;
        }
    this.root = removeNode(this.root, value);
    }
}