const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public')); // ให้ server ใช้งานไฟล์ใน folder 'public'

app.get('/calculate', (req, res) => {
  const { tents, tablesArea, speakerSize, totalPrice } = req.query;

  // คำนวณราคาเต็นท์
  const tentPrice = tents * 1000;

  // คำนวณราคาโต๊ะ
  const tablePrice = tablesArea * 500;

  // คำนวณราคาลำโพง
  let speakerPrice = 0;
  switch (speakerSize) {
    case '2x2':
      speakerPrice = 1000; // ราคาสมมติสำหรับลำโพง 2x2
      break;
    case '4x4':
      speakerPrice = 2000; // ราคาสมมติสำหรับลำโพง 4x4
      break;
    case '4x8':
      speakerPrice = 3000; // ราคาสมมติสำหรับลำโพง 4x8
      break;
  }

  // คำนวณค่าขนส่ง
  let shipping = 2000;
  if (totalPrice >= 50000) {
    shipping = 0;
  }

  // คำนวณราคารวม
  const total = tentPrice + tablePrice + speakerPrice + shipping;

  res.json({ total });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
