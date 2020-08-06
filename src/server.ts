import app from './app';

const port = process.env.PORT || 3333;
const msg = () => console.log(`Started server in http://127.0.0.1:${port}`);

app.listen(port, msg);