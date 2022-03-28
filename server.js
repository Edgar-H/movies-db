const { app } = require('./app');
const { sequelize } = require('./src/util/database.config');
const { initModels } = require('./src/util/initModels');

const PORT = process.env.PORT || 4000;

sequelize
  .authenticate()
  .then(() => console.log('Authentication successful'))
  .catch((err) => console.log(err));

// Models relations
initModels();

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Sync successful');
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.clear();
  console.log('Server is running in port ' + PORT);
});
