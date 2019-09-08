const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const conversations = {};

io.on("connection", socket => {
  let previousId;
  const safeJoin = currentId => {
    socket.leave(previousId);
    socket.join(currentId);
    previousId = currentId;
  };

  socket.on("getChat", chatId => {
    safeJoin(chatId);
    socket.emit("chat", conversations[chatId]);
  });

  socket.on("addChat", chat => {
    conversations[chat.id] = chat;
    safeJoin(chat.id);
    io.emit("chats", Object.keys(conversations));
    socket.emit("chat", chat);
  });

  socket.on("editChat", chat => {
    conversations[chat.id] = chat;
    socket.to(chat.id).emit("chat", chat);
  });

  socket.on("addMessage", chat => {
    try {
      conversations[chat.id].messages.push(chat.message);
      socket.to(chat.id).emit("chat", conversations[chat.id]);
      socket.emit("chat", conversations[chat.id]);
    } catch (err) {
      console.log(err);
    }
  });

  io.emit("chats", Object.keys(conversations));
});

http.listen(4400);
