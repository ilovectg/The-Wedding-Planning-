const db = require('../config/database');

(async () => {
  try {
    await db.testConnection();
    console.log('Test completed successfully');
    process.exit(0);
  } catch (err) {
    console.error('Test failed:', err);
    process.exit(1);
  }
})();
