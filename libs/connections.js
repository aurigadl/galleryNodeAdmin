var ConnecDjon = ConnecDjon || {};

ConnecDjon = (function ( ) {

  var djondb  = require ( 'djondb' )
     ,server  = "localhost"
     ,conport = 1243
     ,manager = new djondb.WrapConnectionManager();

  return {

    setServer: function ( serv ){
      server = serv;
    },

    setPort: function ( port ){
      conport  = port;
    },

    getServer: function ( ){
      return server;
    },

    getPort: function ( ){
      return conport;
    },

    getConnet: function ( ) {
      var con = manager.getConnection( server, conport );
      if( con ){
        con.open( );
        return con;
      }
      console.error('connect error');
      return false;
    }

  };

}());

module.exports = ConnecDjon;
