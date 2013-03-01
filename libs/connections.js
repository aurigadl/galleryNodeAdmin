var djondb = require('djondb');

// Namespace for the library
var ConnecDjon = {};

ConnecDjon = (function () {

  var server  = "localhost",
  manager = new djondb.WrapConnectionManager();

  return {

    setServer: function ( serv ){
      this.server = serv;
    },

    getConnet: function ( ) {
      var con = this.manager.getConnection(this.server);
      if(con){
        con.open();
        return con;
      }
      console.error('connect error');
      return false;
    }

  };

}());

module.exports = ConnecDjon;
