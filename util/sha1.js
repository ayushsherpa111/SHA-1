let {
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
} = require("./utils");
let SHA1 = function(message) {
  let h0 = "01100111010001010010001100000001";
  let h1 = "11101111110011011010101110001001";
  let h2 = "10011000101110101101110011111110";
  let h3 = "00010000001100100101010001110110";
  let h4 = "11000011110100101110000111110000";
  //convert each character to its ASCII mapping
  let asciiMessage = message.split("").map(message => toAscii(message));

  //Convert the ascii value to binary and padd it to be 8 bits each
  let binMessage = asciiMessage
    .map(ascii => toBinary(ascii))
    .map(bin => padBackZero(bin, 8));

  /* PREPROCESSING */

  //pad the message with zeros to make its length = 448 % 512
  let messageBlock = binMessage.join("") + "1";
  while (messageBlock.length % 512 !== 448) {
    messageBlock += "0";
  }

  //The final padded message, contains the full message in binary along with some 0's padded and a 64 bit representation of the length of the input message
  let paddedMessage =
    messageBlock + padBackZero(toBinary(binMessage.join("").length), 64);

  //The padded message is divided in to 512 blocks
  let chunks = divideInBlocks(paddedMessage, 512);

  //Further divide the message into 16 32blocks of bits
  const words = chunks.map(block => divideInBlocks(block, 32));

  //extend the 16 blocks to 80 using Xor operation and Cyclic-leftShift
  words.forEach(chunk => {
    for (let i = 16; i <= 79; i++) {
      let word0 = chunk[i - 3];
      let word1 = chunk[i - 8];
      let word2 = chunk[i - 14];
      let word3 = chunk[i - 16];

      let xorA = XOR(word0, word1);
      let xorB = XOR(xorA, word2);
      let xorC = XOR(xorB, word3);
      chunk[i] = leftShift(xorC, 1);
    }
  });

  /* PREPROCESSING END */

  //Hashing begins
  words.forEach(chunk => {
    let a = h0;
    let b = h1;
    let c = h2;
    let d = h3;
    let e = h4;
    for (let i = 0; i < 80; i++) {
      let f;
      let k;
      if (i < 20) {
        f = or(and(b, c), and(not(b), d));
        k = "01011010100000100111100110011001";
      } else if (i < 40) {
        let bXorc = XOR(b, c);
        f = XOR(bXorc, d);
        k = "01101110110110011110101110100001";
      } else if (i < 60) {
        let bAndc = and(b, c);
        let bAndd = and(b, d);
        let cAndd = and(c, d);
        f = or(bAndc, or(bAndd, cAndd));
        k = "10001111000110111011110011011100";
      } else {
        let bXorc = XOR(b, c);
        f = XOR(bXorc, d);
        k = "11001010011000101100000111010110";
      }

      let temp3 = truncate(
        binAddition(
          binAddition(binAddition(binAddition(e, f), leftShift(a, 5)), k),
          chunk[i]
        ),
        32
      );
      e = d;
      d = c;
      c = leftShift(b, 30);
      b = a;
      a = temp3;
    }
    h0 = truncate(binAddition(h0, a), 32);
    h1 = truncate(binAddition(h1, b), 32);
    h2 = truncate(binAddition(h2, c), 32);
    h3 = truncate(binAddition(h3, d), 32);
    h4 = truncate(binAddition(h4, e), 32);
  });
  return [h0, h1, h2, h3, h4].map(hex => binToHex(hex)).join("");
};
module.exports = { SHA1 };
