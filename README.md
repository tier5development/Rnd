### Remote MySql database connection using Node Js


This project is to connect a remote database from your node application.

To use this project up and running you need to follow following process

### Steps to follow
	$ git clone https://github.com/tier5/Rnd.git
	// or using ssh
	$ git clone git@github.com:tier5/Rnd.git
	$ cd Rnd/
	$ git checkout remote_db_connection_using_node
    $ npm i
    $ cp config/example.json config/config.json
    // or manually copy it to config.json
    $ nano config/config.json
    // or open the file using any editor and add all the values

Final config.json will look like this
```
{
	"dbConn" : {
		"host"       : "192.168.0.1",
		"port"       : "3306",
		"user"       : "San",
		"password"   : "NodeBeginer",
		"database"   : "specific db",
		"debug"      : true
	}

}
```

### Server modification

Need to make sure you have the remote server aceess or atleast you can access the server database using port 3306 ( Default port for mysql ). Otherwise contact the server admin to open the specific port to access the database remotely. If you want to connect any other remote database which is not working with mysql then this project will not work for you by using V 1.0.

If you have server access and mysql installed on your server, then follow bellow mentioned points to access your database remotely.

1. Open port 3306 from AWS console ( Expecting you are using EC2 Instance ) by editing Security group panel

2. Login to the server using terminal and move forward with following process

	$ sudo nano /etc/mysql/my.cnf

	// Add

	[mysqld]

	user            = mysql

	pid-file        = /var/run/mysqld/mysqld.pid

	socket          = /var/run/mysqld/mysqld.sock

	port            = 3306

	basedir         = /usr

	datadir         = /var/lib/mysql

	tmpdir          = /tmp

	bind-address    = 65.55.55.2 ( your ip address here )

	// Save and close the file

	$ mysql -u "Your mysql user" -p"Your password"

	$ mysql> CREATE USER 'user name'@'your ip' IDENTIFIED BY 'some password';

	```$ mysql> GRANT ALL PRIVILEGES ON *.* TO 'user name'@'your ip' WITH GRANT OPTION;```

	$ mysql> FLUSH PRIVILEGES;

### Final steps

If you are done with all the above mentioned process then you can access your remote database by using this project now.

Follow couple of final steps to skip errors in console.

1. Open server.js file using any editor and change the query on line number 16.

```
	client.query('SELECT * FROM users ORDER BY id LIMIT 1', function(err, rows) {
		
		// And done with the connection.
		
		if(err){
		
			console.log('Query Error')
		
		}

		res.json(rows)
		
		client.release()
	})
```

Or if you have 'users' table in your database then voila, you don't need to change any code.

Now run the application using nodemon or node using terminal by running this code inside the project root folder ( $ cd Rnd/ ),

	$ nodemon server.js

	// or

	$ node server.js

	// if you want in specific port then run 

	$ PORT=8080 nodemon server.js

	// or

	$ PORT=8080 node server.js
