var Crud = Crud || {};

Crud = (function ( ) {

  var conn  = require ( './connections.js' ),
      conex = conn.getConnet();

  return {

    //findall
    findall : function ( table ) {
      salida = conex.find( 'pruebadb' ,'books' );
      return salida;
    },

    /**
    //findid
    findid : function ( id ) {
    return
    },

        //findSearch
    findid : function ( query ) {
    return
    },

        //delete
    delete : function ( id, revb ) {
    return
    },

    //update
    update : function ( id ) {
    return
    },

        //create
    create : function ( id ) {
    return
    },
     **/
  };
}());

//console.dir(Crud.findall());
module.exports = Crud;
