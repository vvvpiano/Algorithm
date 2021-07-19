const solution = () => {
    let answers = [];
    let cubes = [];
    for (let i = 0; i <= 100; i++)
        cubes.push(i*i*i);

    for (let b = 2; b < 100; b++) {
        for (let c = b + 1; c < 100; c++) {
            for (let d = c + 1; d < 100; d++) {
                let a = cubes.indexOf(cubes[b] + cubes[c] + cubes[d]);
                if (a > 0)
                    answers.push([a, b, c, d]);
            }
        }
    }

    answers.sort((a, b) => a[0] - b[0]);
    print_format(answers)
}

const print_format = answers => {
    answers.forEach(e => {
        console.log(`Cube = ${e[0]}, Triple = (${e[1]},${e[2]},${e[3]})`);
    });
}

solution();