const createApp = require('./config/app');

const PORT = process.env.PORT || 5000;

function startServer() {
  try {
    const app = createApp();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
}

startServer();
