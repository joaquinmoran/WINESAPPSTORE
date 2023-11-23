const prompt = require ("prompt-sync")({sigint: true})

let name = prompt("name:  ");
console.log("Hello, "+ name + "!");