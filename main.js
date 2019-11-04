const { SHA1 } = require("./util/sha1");
const cli_color = require("cli-color");
// SHA1(
//   "Prof. Devadas describes a mind reading trick that allows you to guess the fifth card that the audience thinks of, after you fail on the first four! With a competent assistant and a little practice, you'll astonish everyone in attendance."
// );
process.stdout.write(cli_color.red.bold("Enter value to hash :"));

process.stdin.on("data", value => {
  const data = value.toString().trim();
  process.stdout.write(`Hash Value :${cli_color.red.bold(SHA1(data))}`);
  process.stdout.write(
    cli_color.red.bold(
      "\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\nEnter value to hash :"
    )
  );
});
