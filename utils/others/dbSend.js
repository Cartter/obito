const { CronJob } = require("cron");

module.exports = client => {
	client.utils.functions.host.sendDbDevs(client) //inicia o sendDB

	const job = new CronJob("0 */12 * * *", async () => {
		dbSend()
	}, null, true, "America/Sao_Paulo");
	job.start();


	function dbSend() {
		const code = `mysqldump -u${process.env.MYSQL_USER} -p${process.env.MYSQL_PASSWORD} ${process.env.MYSQL_DATABASE} > /root/db.sql && /usr/bin/wget --spider "http://localhost:7777/sendFilesToDevs?file=%2Froot%2Fdb.sql"`
		require("child_process").exec(`${code}`, async (e, r, t) => {
			return client.utils.logs.red(`[DB]: "db.sql" enviada!`)
		})
	}
}