class Directory {
    constructor(name) {
        this.name = name;
        this.childs = [];
        this.owner = null;
    }
}

const solution = (codeOwnersMap, directory) => {
    
    const parse_map_to_tree = (codeOwnersMap, parent) => {

        let inner_content_keys = Object.keys(codeOwnersMap);
        if (inner_content_keys[0] === '0') {
            parent.owner = codeOwnersMap;
            // console.log("=====end=====");
            // console.log(parent)
        } else {
            parent.childs = inner_content_keys.map(key => new Directory(key));
            // console.log(parent.childs)
            parent.childs.forEach(directory => {
                // console.log(directory)
                parse_map_to_tree(codeOwnersMap[directory.name], directory);
            });
        }
    }

    const root = new Directory("");
    parse_map_to_tree(codeOwnersMap, root);
    
    const find_directory_owner = (parent, path_array) => {
        // console.log(parent.name, path_array);
        if (path_array.length === 0)
            return parent.owner;
        const directory_name = path_array.shift();
        // console.log("find", directory_name);
        
        const [next_parent] = parent.childs.filter(d => d.name == directory_name);
        // console.log("next", next_parent)
        return find_directory_owner(next_parent, path_array);
    }

    return find_directory_owner(root, directory.split("/"));
}

const codeOwnersMap = {
    "scripts": ["배수진"],
    "services": {
      "business-ledger": ["고찬균", "배수진"],
      "toss-card": ["채주민", "유재섭"],
      "payments": ["유재섭"],
    }
  }

console.log(solution(codeOwnersMap, 'services/payments'));