const fs = require("fs");


console.time("generate data");
const oneExampleUser = "a".repeat(1000);
const sixtyThousandUsers = {data: oneExampleUser.repeat(60000)};
console.timeEnd("generate data");


console.time("write");
fs.writeFileSync("./input.txt", JSON.stringify(sixtyThousandUsers));
console.timeEnd("write");



console.time("read and parse");
const data = fs.readFileSync("./input.txt", {encoding:"utf8", flag:"r"});
console.log((JSON.parse(data).data.length / 1024 / 1024) + " mb");
console.timeEnd("read and parse");