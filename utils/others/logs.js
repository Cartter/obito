const moment = require("moment");
const chalk = require("chalk");
moment.locale('pt-BR');

const log = msg => {
  console.log(`[${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}] ${msg}`);
};

log.good = msg => {
  log(chalk.green(msg));
};

log.warn = msg => {
  log(chalk.yellow(msg));
};

log.red = msg => {
  log(chalk.red(msg));
};

log.blue = msg => {
  log(chalk.blue(msg));
};


log.error = error => {
  log(chalk.red("Error:"));
  console.error(error);
};

log.url = msg => {
  log(chalk.blue(msg));
};

module.exports = log;
