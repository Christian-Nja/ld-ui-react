function hasElement(nodes, id) {
    return nodes.find((node)=> node.id === id)
}

const nodes = [{id : 'a'}, {id: 'b'}]

console.log(hasElement(nodes, 'c'))
