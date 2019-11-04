function toAscii(character = "") {
  return character.charCodeAt(0);
}

function toBinary(ascii) {
  return ascii.toString(2);
}

function padBackZero(bin, nums) {
  let array = bin.split("");
  if (array.length > nums) {
    return bin;
  }
  while (array.length < nums) {
    array.unshift("0");
  }
  return array.join("");
}

function divideInBlocks(message, blockSize) {
  let block = [];
  for (let i = 0; i < message.length; i += blockSize) {
    block.push(message.slice(i, i + blockSize));
  }
  return block;
}

function and(bitA, bitB) {
  let arrayA = bitA.split("").map(letter => +letter);
  let arrayB = bitB.split("").map(letter => +letter);
  const andArray = arrayA.map((num, index) => num & arrayB[index]);
  return andArray.join("").toString();
}

function or(bitA, bitB) {
  let arrayA = bitA.split("").map(letter => +letter);
  let arrayB = bitB.split("").map(letter => +letter);
  const ORarray = arrayA.map((num, index) => num | arrayB[index]);
  return ORarray.join("").toString();
}

function XOR(binA, binB) {
  let arrayA = binA.split("").map(letter => +letter);
  let arrayB = binB.split("").map(letter => +letter);
  const xORarray = arrayA.map((num, index) => num ^ arrayB[index]);
  return xORarray.join("").toString();
}

function not(bin) {
  return bin
    .split("")
    .map(bit => (bit === "1" ? "0" : "1"))
    .join("");
}

function binAddition(a, b) {
  let addition = parseInt(a, 2) + parseInt(b, 2);
  return toBinary(addition);
}

function truncate(val, length) {
  while (val.length > length) {
    val = val.slice(1);
  }
  return val;
}

function leftShift(value, amount) {
  if (amount > value.length) {
    return value;
  }
  return value.slice(amount) + value.slice(0, amount);
}

function binToHex(bin) {
  return parseInt(bin, 2).toString(16);
}

module.exports = {
  toAscii,
  toBinary,
  divideInBlocks,
  padBackZero,
  XOR,
  leftShift,
  and,
  or,
  not,
  binAddition,
  binToHex,
  truncate
};
