const fs = require('fs');
let input = fs.readFileSync("../.././test.txt").toString().trim().split('\n');
const N = parseInt(input.shift());
const ops = input.map(Number);

class MinHeap {
    constructor() {
        this.heap = [];
    }

    peek = () => this.heap[0];

    insert = (number) => {
        this.heap.push(number);
        this.heapify_up();
    }

    remove = () => {
        if (this.heap.length <= 0)
            return 0;
        let node = this.heap[0];
        if (this.heap.length === 1) {
            this.heap = [];
        } else {
            this.heap[0] = this.heap.pop();
            this.heapify_down();
        }
        return node;
    }

    get_parent_index = child_index => Math.floor((child_index - 1) / 2);
    get_leftchild_index = parent_index => parent_index * 2 + 1;
    get_rightchild_index = parent_index => parent_index * 2 + 2;

    heapify_up = () => {
        let index = this.heap.length - 1; // 마지막 노드
        while (index > 0) {
            let parent_index = this.get_parent_index(index);
            if (this.heap[parent_index] > this.heap[index]) { // 위에 있는 값이 더 크면 아래 노드값과 바꾼다
                let temp = this.heap[parent_index];
                this.heap[parent_index] = this.heap[index];
                this.heap[index] = temp;
                index = parent_index;
            } else 
                break;
        }
    }

    heapify_down = () => {
        let index = 0;
        while (this.get_leftchild_index(index) < this.heap.length) {
            let leftchild_index = this.get_leftchild_index(index);
            let rightchild_index = this.get_rightchild_index(index);
            let min_index = rightchild_index < this.heap.length && this.heap[leftchild_index] > this.heap[rightchild_index] 
            ? rightchild_index
            : leftchild_index;
            if (this.heap[min_index] < this.heap[index]) { // 아래 있는 값이 더 작으면 위 노드값과 바꾼다
                let temp = this.heap[min_index];
                this.heap[min_index] = this.heap[index];
                this.heap[index] = temp;
                index = min_index;
            } else
                break;
        }
    }
}

const solution = (N, ops) => {
    const min_heap = new MinHeap();
    let result = "";
    for (let i = 0; i < N; i++) {
        if (ops[i] === 0) {
            result += min_heap.remove() + "\n";
        } else {
            min_heap.insert(ops[i]);
        }
    }
    console.log(result.trim())
}

solution(N, ops);