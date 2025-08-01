import {default as Tree} from "./binarySearchTree.js"


const array = Array.from({length: 40}, () => Math.floor(Math.random() * 100));

let testTree = new Tree(array)

console.log(testTree.isBalanced())

function hi(node){
    console.log(node.data)
}

testTree.prettyPrint(testTree.root)

console.log("level Order")
testTree.levelOrderForEach(hi)
console.log("pre Order")
testTree.preOrderForEach(hi)
console.log("in Order")
testTree.inOrderForEach(hi)
console.log("post Order")
testTree.postOrderForEach(hi)

testTree.insert(105)
testTree.insert(160)
testTree.insert(115)
testTree.insert(143)
testTree.insert(121)

testTree.prettyPrint(testTree.root)

console.log(testTree.isBalanced())
testTree.rebalance()
console.log(testTree.isBalanced())

testTree.prettyPrint(testTree.root)

console.log("level Order")
testTree.levelOrderForEach(hi)
console.log("pre Order")
testTree.preOrderForEach(hi)
console.log("in Order")
testTree.inOrderForEach(hi)
console.log("post Order")
testTree.postOrderForEach(hi)