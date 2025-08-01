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

    insert(value, node=this.root){
        if(value >= node.data){
            if(node.right == null){
                node.right = new Node(value)
            } else {
                this.insert(value, node.right)
            }
        } else if(value < node.data) {
            if(node.left == null){
                node.left = new Node(value)
            } else {
                this.insert(value, node.left)
            }
        }
    }

    delete(value, node=this.root, parent=null, dir=null){
        if(value == node.data){
            if(node.right == null & node.left == null){
                dir == "right" ? parent.right = null : parent.left = null
                return
            } else if(node.left == null & node.right != null){
                dir == "right" ? parent.right = node.right : parent.left = node.right
                return
            } else if(node.right == null & node.left != null){
                dir == "right" ? parent.right = node.left : parent.left = node.left
                return
            } else {
                let replacementNode = node.right.left
                while(replacementNode.left != null){
                    replacementNode = replacementNode.left
                }
                this.delete(replacementNode.data)
                node.data = replacementNode.data 
                return
            }
        } else if(value >= node.data){
            if(node.right != null){
                this.delete(value, node.right, node, "right")
                return
            }
        } else {
            if(node.left != null){
                this.delete(value, node.left, node, "left")
                return
            }
        }
    }

    find(value, node=this.root){
        if(node.left == null && node.right == null){
            return null
        }
        if(value == node.data){
            return node
        } else if(value >= node.data){
            if(node.right == null){
                return null
            }
            return this.find(value, node.right)
        } else if(value < node.data){
            if(node.left == null){
                return null
            }
            return this.find(value, node.left)
        }
    }

    levelOrderForEach(callback){
        if(callback == undefined){
            throw new Error("A callback function is required")
        }
        let queue = [this.root]
        let node = null
        for(let i=0; i<queue.length; i++){
            node = queue[i]
            callback(node)
            if(node.left != null){
                queue.push(node.left)
            }
            if(node.right != null){
                queue.push(node.right)
            }
        }
        return
    }

    preOrderForEach(callback, node = this.root){
        if(callback == undefined){
            throw new Error("A callback function is required")
        }
        if(node == null){
            return
        }

        callback(node)
        this.preOrderForEach(callback, node.left)
        this.preOrderForEach(callback, node.right)
        return
    }

    inOrderForEach(callback, node = this.root){
        if(callback == undefined){
            throw new Error("A callback function is required")
        }
        if(node == null){
            return
        }

        this.inOrderForEach(callback, node.left)
        callback(node)
        this.inOrderForEach(callback, node.right)
        return
    }

    postOrderForEach(callback, node = this.root){
        if(callback == undefined){
            throw new Error("A callback function is required")
        }
        if(node == null){
            return
        }

        this.postOrderForEach(callback, node.left)
        this.postOrderForEach(callback, node.right)
        callback(node)
        return
    }

    height(value, node=this.find(value)){
        if(node == null){
            return null
        }
        if(node.left == null && node.right == null){
            return 0
        } else {
            return Math.max(this.height(value, node.left), this.height(value, node.right)) + 1
        }
    }

    depth(value, node=this.root){
        if(node == null){
            return null
        }
        if(value == node.data){
            return 0
        } else if(value >= node.data){
            if(node.right == null){
                return null
            }
            const depth = this.depth(value, node.right)
            if(depth == null){
                return null
            }
            return depth + 1
        } else if(value < node.data){
            if(node.left == null){
                return null
            }
            const depth = this.depth(value, node.left)
            if(depth == null){
                return null
            }
            return depth + 1
        }
    }

    isBalanced(node=this.root){
        if(node == null){
            return true
        } 
        if(node.left == null && node.right == null){
            return true
        }
        if(node.left == null && node.right != null){
            if(this.height(node.right.data) > 1){
                return false
            }
            return true
        } else if(node.left != null && node.right == null){
            if(this.height(node.left.data) > 1){
                return false
            }
            return true
        } else if(Math.abs(this.height(node.left.data) - this.height(node.right.data)) <= 1){
            return this.isBalanced(node.left) && this.isBalanced(node.right)
        } else {
            return false
        }
    }

    rebalance(){
        let array = []
        function buildArray(node){
            array.push(node.data)
        }

        this.inOrderForEach(buildArray)

        this.root = this.buildTree(array)
    }
}

class Node {
    constructor(data){
        this.data = data
        this.left = null
        this.right = null
    }
}