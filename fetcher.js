const request = require('request');
const fs = require('fs');
const args = process.argv;

// website: http://www.example.edu
// ./test1.txt 


request(args[2], (error, response, body) => {
  if(error) {
    return console.log(`${args[2]} is not a valid website.`);
  }

  fs.writeFile(args[3], body, err => {
    if (err) {
      console.error();
    }
    // file written successfully
    console.log(`Downloaded from ${args[2]} and saved ${body.length} bytes at ${args[3]}`);
  });
});

