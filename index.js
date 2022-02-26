var CSV2SQL = require('csv2sql-lite');
const fs = require('fs')

async function reader() {
    await fs.readdir(`../api_req/data/six/`, (err = new Error, res) => {
        data = res.map(x => x.substring(0, x.length - 4))
        for (let symbol of data) {
            console.log(symbol)
            var csv2sql = CSV2SQL({
                tableName: `${symbol}`,
                dbName: 'six',
            });
            var rstream = fs.createReadStream(`../api_req/data/six/${symbol}.csv`);
            var wstream = fs.createWriteStream(`../data/six/${symbol}.sql`);
            rstream.pipe(csv2sql).pipe(wstream);
        }
    })
}
reader()