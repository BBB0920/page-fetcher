const request = require('request');
const fs = require('fs');
const args = process.argv;

// website: http://www.example.edu
// ./test1.txt 


request(args[2], (error, response, body) => {
  //console.log(response);   // this is for http response code
  if(response.statusCode !== 200 || error) {
    return console.log(`${args[2]} is not a valid website.`);
  }
  // console.log(response);

  let arr = args[3].split('/').slice(0, -1);    //split changes string into an array based on /, then slice extracts the arr from initial to second last
  let filename = args[3].split('/').slice(-1);
  let pathway = arr.join('/');      // Because arr removed / from the initial string, we need to add it back

  if(!fs.existsSync(pathway)) {
    return console.log(`${args[3]} is an invalid pathway!`);
  }

  if(fs.existsSync(args[3])) {
    return console.log(`${filename} already exists in ${pathway}! Please rename.`);
  }

  fs.writeFile(args[3], body, err => {
    if (err) {
      console.error();
    }
    // file written successfully
    // In response, content-length was placed in quotes because it has special character (hyphen) in it
    console.log(`Downloaded from ${args[2]} and saved ${response.headers['content-length']} bytes at ${args[3]}`);
  });
});

