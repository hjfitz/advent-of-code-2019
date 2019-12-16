const fs = require('fs')

const filename = './3/test-dataset5'
// const filename = './3/dataset'

// we know that the dataset consists of a line per wire:
const [wire1, wire2] = fs.readFileSync(filename).toString().split('\n')

let xHeight 
let yHeight


function getMax(...sets) {
    return sets.flat().map(dir => dir.replace(/[a-z]/i, '')).map(num => parseInt(num, 10) + 10).reduce((acc, cur) => acc + cur)
}

function defineGrid(coords) {
    // sum up all left, right, up, down and find the max u/d and l/r
    const up = coords.filter(dir => dir.indexOf('U') === 0)
    const down = coords.filter(dir => dir.indexOf('D') === 0)
    const left = coords.filter(dir => dir.indexOf('L') === 0)
    const right = coords.filter(dir => dir.indexOf('R') === 0)


    yHeight = getMax(up, down)
    xHeight = getMax(left, right)

    console.log({xHeight, yHeight})

    console.log("> Defining grid")

    const grid = new Array(yHeight)
    // for (let y = 0; y < yHeight + 1; y++) {
    //     grid[y] = new Array(xHeight)
    //     // for (let x = 0; x < xHeight + 1; x++) {
    //     //     grid[y][x] = '.'
    //     // }
    // } 

    console.log("> Grid defined")


    grid[Math.floor(yHeight/2)] = new Array(xHeight) 
    grid[Math.floor(yHeight/2)][Math.floor(xHeight/2)] = 'o'

    console.log("> Setting origin")

    return grid
}

// problem output goes here
const grid = defineGrid([wire1, wire2].flat().join(',').split(','))
delete wire1
delete wire2


function printGrid() {
    console.log('====== grid ======')
    for (const row of grid) {
        console.log(row.join(''))
    }
    console.log('====== grid ======')
}

// draw the wire diagram
for (const wire of [wire1, wire2]) {


    console.log("> Working on wire")

// start cursor at bottom left
    let curX = Math.floor(xHeight / 2)
    let curY = Math.floor(yHeight / 2)
    console.log({curX, curY})
    for (const coord of wire.split(',')) {
        if (grid[curY] === undefined) grid[curY] = new Array(xHeight)
        // console.log({cursor})
        const [dir, ...numStr] = coord
        const num = parseInt(numStr.join(''), 10)
        // console.log({dir, num})
        if (dir === 'U') {
            for (let y = 0; y < (num - 1); y++) {
                curY -= 1

                if (grid[curY] === undefined) {
                    grid[curY] = new Array(xHeight)
                }
                const loc = grid[curY][curX]
                // console.log(grid[curY])
                if (loc === undefined) grid[curY][curX] = '|'
                else grid[curY][curX] = 'X'
            }
            curY -= 1
            if (grid[curY] === undefined) {
                grid[curY] = new Array(xHeight)
            }
            grid[curY][curX] = '+'
        }
        if (dir === 'D') {
            for (let y = 0; y < (num - 1); y++) {
                curY += 1
                if (grid[curY] === undefined) {
                    grid[curY] = new Array(xHeight)
                }

                const loc = grid[curY][curX]
                if (loc === undefined) grid[curY][curX] = '|'
                else grid[curY][curX] = 'X'
            }
            curY += 1
            if (grid[curY] === undefined) {
                grid[curY] = new Array(xHeight)
            }
            grid[curY][curX] = '+'
        }
        if (dir === 'R') {
            for (let x = 0; x < (num - 1); x++) {
                curX += 1
                if (grid[curY] === undefined) grid[curY] = new Array(xHeight)

                const loc = grid[curY][curX]
                if (loc === undefined) grid[curY][curX] = '-'
                else grid[curY][curX] = 'X'
            }
            curX += 1
            if (grid[curY] === undefined) {
                grid[curY] = new Array(xHeight)
            }
            grid[curY][curX] = '+'
        }
        if (dir === 'L') {
            for (let x = 0; x < (num - 1); x++) {
                curX -= 1
                if (grid[curY] === undefined) grid[curY] = new Array(xHeight)

                const loc = grid[curY][curX]
                if (loc === undefined) grid[curY][curX] = '-'
                else grid[curY][curX] = 'X'
            }
            curX -= 1
            if (grid[curY] === undefined) {
                grid[curY] = new Array(xHeight)
            }
            grid[curY][curX] = '+'
        }
    }
    // printGrid``
    console.log("> Wire complete")
}

// find all o and X
const results = {
    o: {},
    x: [],
}

console.log("> Beginning traverse")
for (let y = 0; y < grid.length; y++) {
    if (grid[y] !== undefined) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === 'X') results.x.push({y, x})
            if (grid[y][x] === 'o') results.o = {y,x}
        }
    }
}

console.log("> End traverse")
console.log("> Looking for min dist")
console.log(results)
const distances = results.x.map((crd) => (Math.abs(results.o.x - crd.x) + Math.abs(results.o.y - crd.y)))
console.log(distances)
console.log("\n\n> Min distance found: ")
console.log((Math.min(...distances)))