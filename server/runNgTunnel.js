var shell = require("shelljs");
var resp = shell.exec('ngrok http http://localhost:5000"');
if (resp.code !== 0) {
    shell.echo('Error: tunnel failed');
    shell.echo(resp.toString());
    shell.exit(1);
}