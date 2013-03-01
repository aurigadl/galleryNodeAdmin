/*
 * GET Admin.
*/

function admin(app){

  admin.start= function(req, res){
    res.render('admin');
    var io = require('socket.io').listen(app);

    /**
     * our socket transport events
     *
     * You will notice that when we emit the changes
     * in `create`, `update`, and `delete` we both
     * socket.emit and socket.broadcast.emit
     *
     * socket.emit sends the changes to the browser session
     * that made the request. not required in some scenarios
     * where you are only using ioSync for Socket.io
     *
     * socket.broadcast.emit sends the changes to
     * all other browser sessions. this keeps all
     * of the pages in mirror. our client-side model
     * and collection ioBinds will pick up these events
     */

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
  };
}

module.exports = admin;
