class Heap {
    constructor() {
        this.heap = []
    }

    getLeftChildIndex = (parentIndex) => parentIndex * 2 + 1;
    getRightChildIndex = (parentIndex) => parentIndex * 2 + 2;
    getParentIndex = (childIndex) => Math.floor((childIndex - 1) / 2);

    peek = () => this.heap[0];

    insert = (key, value) => {
        const node = {key, value}; // 객체로 node를 만들고
        this.heap.push(node) // push
        this.heapifyUp() // 배열에 가장 끝에 넣고, 다시 min heap의 형태를 갖추도록 한다.
    }

    remove = () => {
        const count = this.heap.length;
        const rootNode = this.heap[0];

        if (count <= 0) return rootNode;
        if (count === 1) this.heap = [];
        else {
            this.heap[0] = this.heap.pop(); // 끝에 있는 노드를 부모로 만들고, 
            this.heapifyDown() // 다시 min heap의 형태를 갖추도록 한다.
        }
        return rootNode;
    }

    heapifyUp() {
        let index = this.heap.length - 1;
        const lastInsertedNode = this.heap[index];

        while (index > 0) {
            const parentIndex = this.getParentIndex(index);
            if (this.heap[parentIndex].key > lastInsertedNode.key) {
                this.heap[index] = this.heap[parentIndex];
                index = parentIndex;
            } else
                break;
        }

        this.heap[index] = lastInsertedNode;
    }

    heapifyDown() {
        let index = 0;
        const count = this.heap.length;
        const rootNode = this.heap[index];

        // 계속해서 left child가 있을 때까지 검사한다.
        while (this.getLeftChildIndex(index) < count) {
            const leftChildIndex = this.getLeftChildIndex(index);
            const rightChildIndex = this.getRightChildIndex(index);
            
            // 왼쪽, 오른쪽 중에 더 작은 노드를 찾는다.
            const smallerChildIndex = rightChildIndex < count && this.heap[rightChildIndex].key < this.heap[leftChildIndex].key
            ? rightChildIndex
            : leftChildIndex

            // 자식 노드의 키 값이 루트노드보다 작다면 위로 끌어올린다.
            if (this.heap[smallerChildIndex].key <= rootNode.key) {
                this.heap[index] = this.heap[smallerChildIndex];
                index = smallerChildIndex;
            } else
                break;
            
            this.heap[index] = rootNode;
        }
    }
}