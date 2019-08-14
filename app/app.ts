// lib/app.ts
import express = require('express');
import { LogService } from './log-service';
// Create a new express application instance
const app: express.Application = express();
// Create log service
const logService = new LogService();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// log
app.use((req, res, next) => {
  logService.writeLog(req.body, req.headers);
  next();
});
app.get('/', (req, res) => {
  res.send(req.baseUrl);
});

app.listen(3000, function() {
  console.log(' App listening on port 3000!');
});
