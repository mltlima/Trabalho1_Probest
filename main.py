function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function algothm1() {
    //vertices positions travaled 
    let pos = [0];
    const allPos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    // randomly generates -1 or 1
    function randomSign() {
        return Math.random() < 0.5 ? -1 : 1;
    }

    function move() {
        const movement = randomSign();
        
        let newPos = parseInt((pos[pos.length - 1] + movement) % 12);
        if (newPos < 0) {
            newPos = parseInt(((newPos % 12) + 12) % 12);
        }
        pos.push(newPos);
    }

    let checker = allPos.every(v => pos.includes(v));
    while (!checker) {
        move();
        checker = allPos.every(v => pos.includes(v));
    }
    return pos;
}


//run algothm1 5000 times
let sumTotal = 0;
let occurencies = {};

for (let i = 0; i < 5000; i++) {
    let answ = algothm1();
    const len = answ.length;
    //console.log(len)
    sumTotal += len;
    //count occurencies of each position at array answ
    //let occurenciesAnsw = {};
    answ.forEach(v => {
        occurencies[v] = (occurencies[v] || 0) + 1;
    });
}
//console.log(occurencies);
console.log("Média ", Math.round(sumTotal / 5000));

const vertices = Object.entries(occurencies);
const verticesOcurrencies = Object.values(occurencies);

//console.log(vertices);
//console.log(verticesOcurrencies);
//percentage for each vertex
let percentage = 0;
let vertice = 0;
verticesOcurrencies.forEach(v => {
    console.log(`vertice ${vertice}: ${((v / sumTotal) * 100).toFixed(2)}%`);
    percentage += (v / sumTotal) * 100; 
    vertice++;
});

//sum of all probabilities divided by total number of vertices
console.log(`Massa de probabilidade: ${(percentage/12).toFixed(2)}%`);
