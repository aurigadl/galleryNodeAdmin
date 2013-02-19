/*
 * Logout
 */

exports.logout = function(req, res){
  // destroy the user's session to log them out
  req.session.destroy(function(){
    res.redirect('/');
  });
};
