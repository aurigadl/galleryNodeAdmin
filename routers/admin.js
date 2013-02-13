/*
 * GET Admin.
 */

exports.admin = function(req, res){
  res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>');
};
