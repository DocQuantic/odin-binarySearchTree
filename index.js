import {default as Tree} from "./binarySearchTree.js"

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]

const test = new Tree(array)

test.prettyPrint(test.root)

test.insert(300)

test.prettyPrint(test.root)

test.delete(7)

test.prettyPrint(test.root)

console.dir(test.find(3574354))

function hi(node){
    console.log(node.data)
}

console.log("level order traversal")
test.levelOrderForEach(hi)
console.log("pre-order traversal")
test.preOrderForEach(hi)
console.log("in-order traversal")
test.inOrderForEach(hi)
console.log("post-order traversal")
test.postOrderForEach(hi)

console.log("height")

console.log(test.height(8))
