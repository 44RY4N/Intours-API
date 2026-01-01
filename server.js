const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: `${__dirname}/config.env` });

// console.log(process.env);

mongoose.connect(process.env.DATABASE).then((conn) => {
  console.log('Succesfuly Connected to DB!😁');
  //console.log(conn.connections);
});

const app = require(`${__dirname}/app.js`);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
