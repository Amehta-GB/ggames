const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')

class connectedUser{
    constructor(socket){
        this.id=_users.length;
        this.socket=socket;
        socket.on('user-position',(d)=> {
            this.pos_= d;
            this.spamEveryone();
        
        });
        
    }
    spamEveryone(){
        //this.pos_=[d.x,d.y,d.z]
        //this.socket.emit('pos',[this.id , this.pos_])
        for(let i=0;i<_users.length;++i){
            //_users[i].socket.emit('pos',[this.id , this.pos_])
             
            io.emit('pos',[this.id , this.pos_])
        }

    }
}





const _users=[]

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.redirect(`/${uuidV4()}`)
  })



  app.get('/operator', (req, res) => {
    res.render('room2', { roomId: req.params.room })
  })



  
  app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room })
  })


  io.on('connection', socket => {
     
    //console.log(d)
    _users.push(new connectedUser(socket))
    

    socket.on('join-room', (roomId, userId) => {

        //io.emit('user-connected2', userId)
        socket.emit('user-connected2', userId)
        console.log(roomId,userId)
        socket.join(roomId)
        socket.to(roomId).emit('user-connected', userId)
         
        
    })



    socket.on('disconnect', () => {
       
        //socket.to(roomId).emit('user-disconnected', userId)
    })





})


server.listen(3000)

