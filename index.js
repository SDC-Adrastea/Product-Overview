const app = require('./app')
var port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})