const fs = require('fs');
let input = fs.readFileSync("../.././test.txt").toString().trim().split('\n');
const T = parseInt(input.shift());

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

class MaxHeap {
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
            if (this.heap[parent_index] < this.heap[index]) { // 위에 있는 값이 더 작으면 아래 노드값과 바꾼다
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
            let max_index = rightchild_index < this.heap.length && this.heap[leftchild_index] < this.heap[rightchild_index] 
            ? rightchild_index
            : leftchild_index;
            if (this.heap[max_index] > this.heap[index]) { // 아래 있는 값이 더 크면 위 노드값과 바꾼다
                let temp = this.heap[max_index];
                this.heap[max_index] = this.heap[index];
                this.heap[index] = temp;
                index = max_index;
            } else
                break;
        }
    }
}

const solution = (T, input) => {
    for (let i = 0; i < T; i++) {
        let M = parseInt(input.shift());
        let array = [];
        for (let j = 0; j < Math.ceil(M / 10); j++) {
            array = array.concat(input.shift().split(" ").map(Number));
        }
        // console.log(M, array)
        print_odd_median(M, array);
    }
}

const print_odd_median = (M, array) => {
    let small = new MaxHeap();
    let big = new MinHeap();
    small.insert(Number.MIN_SAFE_INTEGER); // max_heap small은 중앙값보다 작은 수를 정렬하는데 사용
    big.insert(Number.MAX_SAFE_INTEGER); // min_heap big은 중앙값보다 큰 수를 정렬하는데 사용
    let answer = [];
    for (let i = 0; i < array.length; i++) {
        let n = array[i];
        // console.log("new number:", n)
        if (i % 2 === 0) {
            let select = [small.remove(), n, big.remove()].sort((a, b) => a - b);
            // console.log(select)
            answer.push(select[1]);
            small.insert(select[0]);
            small.insert(select[1]); // 중앙값을 small에 넣음. 이 값은 small에서 max가 됨.
            big.insert(select[2]);
        } else {
            let select = [small.remove(), n].sort((a, b) => a - b)
            small.insert(select[0]);
            big.insert(select[1]);
        }
        // console.log("small:", small.heap);
        // console.log("big:", big.heap);
    }

    console.log(answer.length);
    for (let i = 0; i < Math.ceil(answer.length / 10); i++) {
        let cut_by_ten = answer.slice(i*10, (i+1)*10)
        console.log(cut_by_ten.join(" "))
    }
}

solution(T, input);