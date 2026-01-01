const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/config.env` });

console.log(process.env);

const app = require(`${__dirname}/app.js`);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
