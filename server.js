// Import the express module
const express = require('express');

// Create an Express application instance
const app = express();

// Define the port the server will listen on
// Use the PORT environment variable if available, otherwise default to 8080
const PORT = process.env.PORT || 8080;

// Define the directory from which to serve static content
// This assumes your static files (HTML, CSS, images) are in a folder named 'public'
const staticPath = 'public';

// Configure Express to serve static files from the 'public' directory
// The content inside the 'public' folder will be accessible directly.
// For example, public/index.html will be accessible at http://localhost:8080/index.html
app.use(express.static(staticPath));

// Add a dedicated health check route that the platform can use.
// This route will always respond with a 200 OK status if the server is running.
app.get('/_health', (req, res) => {
  res.status(200).send('OK');
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`✅ Static web server is running on port ${PORT}`);
  console.log(`Serving content from the directory: ./${staticPath}`);
  console.log(`Access it at: http://localhost:${PORT}`);
});