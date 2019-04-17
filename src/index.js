import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Configure server to listen on port 3000
const port = process.env.PORT || 4000;

app.use('*', (req, res) => {
  res.send('Welcome to the API');
})
app.listen(port, () => {
  console.log(`Listening on port ${port}`); // eslint-disable-line
});

export default app;
