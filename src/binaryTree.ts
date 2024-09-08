class TreeNode {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(value: number) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function preorderTraversal(root: TreeNode | null): void {
    if (root === null) return;
    console.log(root.value);
    preorderTraversal(root.left);
    preorderTraversal(root.right);
}

// Example usage:
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

preorderTraversal(root); // Output: 1 2 4 5 3

function inorderTraversal(root: TreeNode | null): void {
    if (root === null) return;
    inorderTraversal(root.left);
    console.log(root.value);
    inorderTraversal(root.right);
}

// Example usage:
inorderTraversal(root); // Output: 4 2 5 1 3


function postorderTraversal(root: TreeNode | null): void {
    if (root === null) return;
    postorderTraversal(root.left);
    postorderTraversal(root.right);
    console.log(root.value);
}

// Example usage:
postorderTraversal(root); // Output: 4 5 2 3 1



//R0LR

function iterativePreorder(root: TreeNode | null): void {
    if (root === null) return;

    const stack: TreeNode[] = [root];

    while (stack.length > 0) {
        const node = stack.pop()!;
        console.log(node.value);

        if (node.right) stack.push(node.right);
        if (node.left) stack.push(node.left);
    }
}

// Example usage:
iterativePreorder(root); // Output: 1 2 4 5 3

// LRoR
function iterativeInorder(root: TreeNode | null): void {
    const stack: TreeNode[] = [];
    let current = root;

    while (current !== null || stack.length > 0) {
        while (current !== null) {
            stack.push(current);
            current = current.left;
        }

        current = stack.pop()!;
        console.log(current.value);
        current = current.right;
    }
}

// Example usage:
iterativeInorder(root); // Output: 4 2 5 1 3

// LRRo
function iterativePostorder(root: TreeNode | null): void {
    if (root === null) return;

    const stack1: TreeNode[] = [root];
    const stack2: TreeNode[] = [];

    while (stack1.length > 0) {
        const node = stack1.pop()!;
        stack2.push(node);

        if (node.left) stack1.push(node.left);
        if (node.right) stack1.push(node.right);
    }

    while (stack2.length > 0) {
        const node = stack2.pop()!;
        console.log(node.value);
    }
}

// Example usage:
iterativePostorder(root); // Output: 4 5 2 3 1


