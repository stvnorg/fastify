var request = require('request');
 
function getQuote() {
  var quote;
 
  return new Promise(function(resolve, reject) {
    request('http://ron-swanson-quotes.herokuapp.com/v2/quotes', function(error, response, body) {
      quote = body;
 
      resolve(quote);
    });
  });
}

function add(x,y) {
	var result;
	return new Promise(function(resolve, reject) {
		result = x + y;
		setTimeout(function() { resolve(result) } ,10000);
	});
} 

async function main() {
  var quote = await getQuote();
  var result = await add(1,2);
  console.log(quote, result, new Date().toLocaleString());
}
 
main();
console.log(new Date().toLocaleString());
console.log('Ron once said,');
