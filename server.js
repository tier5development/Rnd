
/* All constants defined here */
const 	express   = require('express'),
		app       = express(),
		mysql     = require('mysql'),
		conn      = require('./config/database'),
		port 	  = process.env.PORT || '3000'


/* Connect the db and query data */
app.get('/', function (req, res) {

	conn.getConnection(
        function (err, client) {

            client.query('SELECT * FROM users ORDER BY id LIMIT 1', function(err, rows) {
                // And done with the connection.
                if(err){
                    console.log('Query Error')
                }

                res.json(rows)
                client.release()
            })

    })
})

app.listen(port, () => console.log('Our app listening on port '+port+'!'))
