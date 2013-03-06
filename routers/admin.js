/*
 * GET Admin.
 */

var admin = function ( app ){

  return {

    getAdmin : function(req, res){
      var io = require('socket.io').listen(app);

      io.sockets.on('connection', function (socket) {

        socket.on('todo:create', function (data, callback) {
          var id = guid.gen()
          , todo = db.set('/todo/' + id, data)
          , json = todo._attributes;

          socket.emit('todos:create', json);
          socket.broadcast.emit('todos:create', json);
          callback(null, json);
        });

        /**
         * todos:read
         *
         * called when we .fetch() our collection
         * in the client-side router
         */

        socket.on('todos:read', function (data, callback) {
          var list = [];

          db.each('todo', function (todo) {
            list.push(todo._attributes);
          });

          callback(null, list);
        });

        /**
         * todos:update
         *
         * called when we .save() our model
         * after toggling its completed status
         */

        socket.on('todos:update', function (data, callback) {
          var todo = db.get('/todo/' + data.id);
          todo.set(data);

          var json = todo._attributes;

          socket.emit('todos/' + data.id + ':update', json);
          socket.broadcast.emit('todos/' + data.id + ':update', json);
          callback(null, json);
        });

        /**
         * todos:delete
         *
         * called when we .destroy() our model
         */

        socket.on('todos:delete', function (data, callback) {
          var json = db.get('/todo/' + data.id)._attributes;

          db.del('/todo/' + data.id);

          socket.emit('todos/' + data.id + ':delete', json);
          socket.broadcast.emit('todos/' + data.id + ':delete', json);
          callback(null, json);
        });

      });

      res.render('admin');
    }
  };
};

module.exports = admin;
