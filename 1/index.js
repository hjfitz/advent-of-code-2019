const fs = require('fs')

const out = fs.readFileSync('./dataset')
    .toString()
    .split('\n')
    .reduce((acc, cur) => {
        return acc + (Math.floor(parseInt(cur, 10) / 3) - 2)
    }, 0)

console.log(out)