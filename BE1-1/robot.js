const fs = require('fs');
const http = require('http');

function buildRobot(callback) {
  fs.readFile('head.txt', 'utf8', (err, head) => {
    if (err) return callback(err);
    fs.readFile('body.txt', 'utf8', (err, body) => {
      if (err) return callback(err);
      fs.readFile('leg.txt', 'utf8', (err, leg) => {
        if (err) return callback(err);
        fs.readFile('feet.txt', 'utf8', (err, feet) => {
          if (err) return callback(err);
          const text = head + body + leg + feet;
          fs.writeFile('robot.txt', text, (err) => {
            callback(err, text);
          });
        });
      });
    });
  });
}

http.createServer((req, res) => {
  buildRobot((err, text) => {
    if (err) {
      res.writeHead(500);
      return res.end('อ่านไฟล์ไม่สำเร็จ');
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<!DOCTYPE html>
<html lang="th">
<head><meta charset="UTF-8"><title>Robot</title></head>
<body>
  <pre>${text}</pre>
  <script>alert(${JSON.stringify(text)});</script>
</body>
</html>`);
  });
}).listen(3000, () => console.log('เปิด http://localhost:3000'));