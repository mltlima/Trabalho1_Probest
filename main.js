function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function algothm1() {
    //vertices positions traveled 
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
    sumTotal += len;
    //count occurencies of each position at array answ
    answ.forEach(v => {
        occurencies[v] = (occurencies[v] || 0) + 1;
    });
}

console.log("Média ", Math.round(sumTotal / 5000));
console.log("");

const vertices = Object.entries(occurencies);
const verticesOcurrencies = Object.values(occurencies);

let percentage = 0;
let vertice = 0;
verticesOcurrencies.forEach(v => {
    console.log(`vertice ${vertice}: ${((v / sumTotal) * 100).toFixed(2)}%`);
    percentage += (v / sumTotal) * 100; 
    vertice++;
});

//sum of all probabilities divided by total number of vertices
console.log("");
console.log(`Massa de probabilidade: ${(percentage/12).toFixed(2)}%`);
console.log("");


//insect jump to a random possible position
function jump(pos) {
    
    // 9x9 matrix of probabilities
    let matrixProb = [  [1, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0.33, 0, 0.33, 0, 0.33, 0, 0, 0, 0],
                        [0, 0.5, 0, 0, 0, 0.5, 0, 0, 0],
                        [0.33, 0, 0, 0, 0.33, 0, 0.33, 0, 0],
                        [0, 0.25, 0, 0.25, 0, 0.25, 0, 0.25, 0],
                        [0, 0, 0.33, 0, 0.33, 0, 0, 0, 0.33],
                        [0, 0, 0, 0.5, 0, 0, 0, 0.5, 0],
                        [0, 0, 0, 0, 0.33, 0, 0.33, 0, 0.33],
                        [0, 0, 0, 0, 0, 0, 0, 0, 1]];

    //get all probabilities of position
    const prob = matrixProb[pos -1];

    //const random number for next position
    let nextPos = random(0, 8);

    while (prob[nextPos] === 0) {
        nextPos = random(0, 8);
    }
    return(nextPos + 1)
}

function algothm2(pos) {
    
    let allJumps = [pos];
    
    while (pos !== 1 && pos !== 9) {
        pos = jump(pos);
        allJumps.push(pos);
    }

    return [allJumps, pos];
}

//Probability of the insect get caught in trap 1 or 9 starting from position 2 to 8
//and how many jumps it makes
let trap1 = [0,0,0,0,0,0,0];
let trap9 = [0,0,0,0,0,0,0];
let jumps = [0,0,0,0,0,0,0];

function probabilities() {
    for (let i = 2; i < 9; i++) {
        for (let j = 0; j < 5000; j++) {
            const results = algothm2(i);
            if (results[1] === 1) {
                trap1[i - 2]++;
            } else if (results[1] === 9) {
                trap9[i - 2]++;
            }
            jumps[i - 2] += results[0].length;
        }
    }

    trap1.forEach((v, i) => {
        console.log(`Probabilidade de cair na armadilha 1 partindo do ponto ${i + 2}: ${((v * 100)/5000).toFixed(2)}%`);
    });

    console.log("");
    
    trap9.forEach((v, i) => {
        console.log(`Probabilidade de cair na armadilha 9 partindo do ponto ${i + 2}: ${((v * 100)/5000).toFixed(2)}%`);
    });

    console.log("");

    jumps.forEach((v, i) => {
        console.log(`Média de saltos partindo do ponto ${i + 2}: ${v / 5000}`);
    });

}
probabilities();

function visitsToCenter() {
    let visits = 0;

    for (let i = 0; i < 5000; i++) {
        results = algothm2(7);
        //counts how many times the number 5 is in the array
        results[0].forEach(v => { 
            if (v === 5) {
                visits++;
            }
        });

    }
    console.log("");
    console.log(`A média de visitas ao centro: ${(visits/5000)}`);
}
visitsToCenter();
