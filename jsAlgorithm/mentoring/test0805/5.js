const solution = (stones, k) => {
    let low = 0;
    let high = Math.max(...stones) || 200000000;
    let mid;
    let ans;
    while (low <= high) {
        mid = Math.floor((low + high) / 2);
        if (can_go(mid, stones, k)) {
            ans = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return ans;
}

const can_go = (n_of_students, stones, k) => {
    let count = 0;
    let i = 0;
    while (i < stones.length) {
        if (stones[i] < n_of_students) {
            count++;
            if (count >= k)
                return false;
        } else {
            count = 0;
        }
        i++
    }
    return true;
}

console.log(solution([2, 4, 5, 3, 2, 1, 4, 2, 5, 1], 3))