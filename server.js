// server.js
const express = require('express');
const http = require('http'); // Node.js 기본 내장 모듈
const { Server } = require('socket.io');

const app = express();
// Express 앱을 기반으로 기본 HTTP 서버를 생성합니다.
const server = http.createServer(app);
// 생성된 HTTP 서버에 Socket.io를 연결합니다.
const io = new Server(server);

// 클라이언트가 접속할 기본 폴더(public)를 지정합니다.
app.use(express.static('public'));

// --- Socket.io 핵심 로직 ---
// 'connection' 이벤트: 누군가 웹소켓으로 서버에 접속했을 때 실행됨
// server.js 의 Socket.io 핵심 로직 부분 수정
io.on('connection', (socket) => {
  console.log('🟢 새로운 사용자가 접속했습니다! (Socket ID:', socket.id, ')');

  // 💡 클라이언트가 'chat message'라는 이름으로 보낸 데이터를 받음 (수신)
  socket.on('chat message', (msg) => {
    console.log('받은 메시지: ' + msg);

    // 💡 받은 메시지를 접속해 있는 "모든" 클라이언트에게 다시 보냄 (확성기 역할)
    io.emit('chat message', msg);
  });


  socket.on('disconnect', () => {
    console.log('🔴 사용자가 퇴장했습니다. (Socket ID:', socket.id, ')');
  });
});


// 서버를 3000번 포트에서 실행합니다.
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});