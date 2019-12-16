const fs = require('fs')
const chunk = require('lodash/chunk')

const filename = './2/dataset'
const testfile = './2/test-dataset'

const input = fs.readFileSync(filename).toString().trim().split(',').map(no => parseInt(no, 10))

const chunked = chunk(input, 4)


/**
 * Opcode 1 adds together numbers read from two positions 
 * and stores the result in a third position. 
 * The three integers immediately after the opcode tell you these three positions - 
 * the first two indicate the positions from which you should read the input values, 
 * and the third indicates the position at which the output should be stored
 */
function op1(line) {
    
}

/**
 * Opcode 2 works exactly like opcode 1, 
 * except it multiplies the two inputs instead of adding them. 
 * Again, the three integers after the opcode indicate where the inputs and outputs are, 
 * not their values.
 */
function op2(line) {
    
}

for (let i = 0; i < chunked.length; i += 1) {
    const chunk = chunked[i]
    const [opcode, first, second, pos] = chunk
    if (opcode === 1) 
    input[pos] = input[first] + input[second]
    
    
    else if (opcode === 2) 
    input[pos] = input[first] * input[second]
    
    else if (opcode === 99)
    break
    
    
}


console.log(input[0])