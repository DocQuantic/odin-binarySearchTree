export default class BinarySearchTree {
    constructor(array){
        this.root = this.buildTree(this.balanceArray(array))
    }

    balanceArray(array){
        const unique = [...new Set(array)]
        const sorted = unique.sort((a, b) => a-b)

        console.log(sorted)
        return sorted
    }

    buildTree(array){
        if(array.length === 3){

            const rootNode = new Node(array[1])
            rootNode.left = new Node(array[0])
            rootNode.right = new Node(array[2])

            return rootNode
        } else if(array.length === 2 ){
            const rootNode = new Node(array[1])
            rootNode.left = new Node(array[0])

            return rootNode
        } else if(array.length === 1){

            const rootNode = new Node(array[0])

            return rootNode
        }
        const arrayLength = array.length

        const rootNode = new Node(array[Math.floor(arrayLength/2)])
        const leftArray = array.slice(0, Math.floor(arrayLength/2))
        const rightArray = array.slice(Math.floor(arrayLength/2)+1, arrayLength)

        rootNode.left = this.buildTree(leftArray)
        rootNode.right = this.buildTree(rightArray)

        return rootNode
    }

    prettyPrint(node, prefix = '', isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    };
}

class Node {
    constructor(data){
        this.data = data
        this.left = null
        this.right = null
    }
}