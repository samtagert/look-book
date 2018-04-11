var request = require('request-promise-native');

function index (req, res) {
  request(`https://nordstromrack.com/api/search2/catalog/search?query={${req.body.search}}`, function(error, nordResponse) {
    var products = JSON.parse(nordResponse.body)._embedded['http://hautelook.com/rels/products']
    res.json(products);
  })
}

module.exports = {
  index
};