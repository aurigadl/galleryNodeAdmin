var crud = require('../libs/crud');
/*
 * GET Admin.
 */

exports.page = function(req, res){
 // p = crud.findall('books');
  p = 'Salida';
  console.log('result in page.js ' + p);
  res.render('page');
};
