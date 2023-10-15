import express from 'express';
const app = express();

app.get('/login', (req, res) => {
  const username = 'user';
  const status = 'ok';

  res.json({ username, status });
});

app.get('/pin', (req, res) => {
    try {
        const num = req.query.count || 20;
        const id = req.query.lastID || 0;

        let images = [];
        let lastID;

        for (let i = 0; i < num; i++) {
        const image = {
            id: id + i,
            url: `https://example.com/image/${id + i}`,
        };
        images.push(image);
        }

        lastID = id + num;

        res.json({ images, lastID });
    } catch (error) {
        console.error('Ошибка при генерации пинов:', error);
        res.status(500).json({ error: 'Ошибка при генерации пинов' });
    }
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
