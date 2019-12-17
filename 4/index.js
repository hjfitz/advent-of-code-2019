const [min, max] = '165432-707912'.split('-').map(el => parseInt(el, 10))

new Array(max - min)
    .fill()
    .map((_, idx) => min + idx + 1)
    .map(num => [...String(num)])
    .filter(numArr =>  JSON.stringify(numArr) === JSON.stringify([...numArr].sort()))
    .filter(arr => !!arr.filter((num, idx) => idx === arr.length ? false : num === arr[idx + 1]).length)

console.log((possibilities).length)
