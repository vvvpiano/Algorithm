const solution = (cacheSize, cities) => {
    let cache_box = [];
    cities = cities.map(city => city.toLowerCase())

    let time = 0;

    for (let i = 0; i < cities.length; i++) {
        if (cache_box.includes(cities[i])) { // cache hits
            time += 1;
            let item = cache_box.splice(cache_box.indexOf(cities[i]), 1);
            cache_box.push(...item);
        } else { // cache miss
            time += 5;
            if (cacheSize === 0)
                continue;
            if (cache_box.length < cacheSize) {
                cache_box.push(cities[i]);
            }
            else {
                cache_box.shift();
                cache_box.push(cities[i]);
            }
        }
        // console.log(cache_box)
    }

    return time;
}

let testcase = [
    [3, ["Jeju", "Pangyo", "Seoul", "NewYork", "LA", "Jeju", "Pangyo", "Seoul", "NewYork", "LA"]],
    [3, ["Jeju", "Pangyo", "Seoul", "Jeju", "Pangyo", "Seoul", "Jeju", "Pangyo", "Seoul"]],
    [2, ["Jeju", "Pangyo", "Seoul", "NewYork", "LA", "SanFrancisco", "Seoul", "Rome", "Paris", "Jeju", "NewYork", "Rome"]],
    [5, ["Jeju", "Pangyo", "Seoul", "NewYork", "LA", "SanFrancisco", "Seoul", "Rome", "Paris", "Jeju", "NewYork", "Rome"]],
    [2, ["Jeju", "Pangyo", "NewYork", "newyork"]],
    [0, ["Jeju", "Pangyo", "Seoul", "NewYork", "LA"]],
    [0, ["jeju", "jeju", "jeju", "jeju", "jeju", "jeju"]]
]

for (let i = 0; i < testcase.length; i++) {
    console.log(solution(...testcase[i]));
}