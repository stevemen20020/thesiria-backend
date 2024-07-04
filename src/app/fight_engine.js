const fight_engine = (server) => {
  const { Server } = require("socket.io")
  const io = new Server(server, {
    cors: {
      origin:'*',
      allowedHeaders: ['Content-Type', 'Authorization', 'id_session']
    }
  })

  io.on("connection", (socket) => {
    console.log('conectado')

    socket.on('start-battle', async () => {
      console.log('battle starting')

      io.emit('battle-call', {
        called_ids:[1,2,3]
      })
    })
  })
}

module.exports.fight_engine = fight_engine