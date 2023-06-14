const mongoose = require('mongoose');

module.exports = (URI) => {
  if (!URI || typeof URI !== 'string') {
    return;
  }

  mongoose
    .connect(URI)
    .then(() => {
      console.log('Connection to Database successful');
    })
    .catch((err) => {
      console.log('Connection to MongoDB failed', err.message);
    });
};
