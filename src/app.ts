import express from 'express';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => res.status(200).json({ message: 'Hello world!' }));

app.listen(port, () => console.log(`App listening on port ${5000}`));
