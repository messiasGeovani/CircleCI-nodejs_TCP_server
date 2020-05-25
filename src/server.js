// environment variables config
require('dotenv').config()

// net tcp module import
const net = require('net')

// server init
const server = net.createServer((socket) => {
    socket.write('server initiated!')
    socket.pipe(socket)
})

// server port config
const port = process.env.PORT || 2000

// server host config
const host = process.env.HOST || 'localhost'

// server connection listener config
server.on('connection', async (socket) => {

    // getting remote client info
    const {
        remotePort,
        remoteAddress,
        remoteFamily
    } = socket

    console.log('client connected', {
        remotePort,
        remoteAddress,
        remoteFamily
    })

    // data encoding config
    socket.setEncoding('utf-8')

    // server data listener config
    socket.on('data', (data) => {
        console.log(`Server got: ${data}`)
        socket.write(`Server was received from you: ${data}`)
    })

    // server connections close listener config
    socket.on('close', (error) => {
        const {
            bytesRead,
            bytesWritten,
        } = socket

        console.log('connection closed', {
            remotePort,
            remoteAddress,
            remoteFamily,
            bytesRead,
            bytesWritten
        })

        if (error) {
            console.log('connection closed cause of trasmission error', {
                error
            })
        }
    })
})

// starting the server
server.listen(port, host, () => console.log(`Server listenning at ${host}:${port}`))