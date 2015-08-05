# Conduit

Conduit is a database manager for Apache Cassandra that runs in the browser. The backend is written in Grape, and the frontend uses Backbone.Marionette.

## Regular Setup

Use this setup if you would just like to get up and running with Conduit as soon as possible for regular use. If you would like to contribute to the project, there is a development setup section further down that I suggest you follow instead.

Clone the repository locally with

```sh
$ git clone https://github.com/AnthonyBobsin/conduit.git
```

Then in Conduit's home directory, run

```sh
$ bundle install
```

A server executable file is included in order to run Conduit locally.

```sh
$ ./server
```

While the server is running, go to http://localhost:9999/public/index.html and you will be able to run queries to your local Cassandra keyspaces.

The Cassandra host settings are in the /config/config.yml file, currently set to localhost, but you can provide changes to the development field in that file to supply a different host.

## How to Use

Once you have everything set up and your server is running, navigate to http://localhost:9999/public/index.html and you should see your Cassandra keyspaces located in the left sidebar. You can navigate through each keyspace's tables and columns to decide what you need to query.

The keyspace that is highlighted blue will be the default keyspace your queries will be for, but you can override this by prepending the keyspace you prefer to the table in your query. Type your query into the CQL input, then press the "Run Query" button and if the query is valid it will load all the affected rows into the table below. If it is not valid, the table will turn red and an error will show.

All queries you have run previously will save into your Query History, and all the queries you save (beside the "Run Query" button) will save into your Query Favorites. They hold up to 10 queries, pushing your last one out whenever you add more than that. Both of these you can view and clear by clicking the appropriate button above the table. Click on any of the queries in these popovers to load it into the CQL input.

Each Cassandra request currently has a paging state of 100 rows for each query. This means that your query result will come in chunks of 100 rows. As you scroll down, more rows will be requested from where it left off. You can tell if there are more rows to request if the status bar says '**More than** xxxx rows affected'.

If you have a column with 'json' included in the name, you can click on any of its data cells and it will open the value in a JSON viewer modal. This modal assumes that the value is a string in JSON format, and it will display the value in parsed JSON format with syntax highlighting.

### Shortcuts

CTRL/CMD + ENTER - Runs the current query.
DBLClick on a table in the sidebar - Makes that table's keyspace active, and opens the popover to load a default 'SELECT' query for that table.
DBLClick on a column in the sidebar - Makes that column's keyspace active, and opens the popover to load a default 'SELECT ... WHERE' query for that column.
DBLClick on a tab - Allows you to change the title of the tab.

## Development Setup

Use this setup if you would like to contribute to Conduit.

First clone the repository locally with

```sh
$ git clone https://github.com/AnthonyBobsin/conduit.git
```

### Frontend Setup

We use Handlebars for templating. In order to precompile these templates, along with all sass files, we use Gulp. The package.json file is set-up so you should be able to install both these packages by switching to the /www directory and running

```sh
$ npm install
```

Give permissions if necessary.
If you receive the warning, "cannot run in wd", run

```sh
$ npm install --unsafe-perm
```

While developing for the frontend, in order to watch for any changes to templates and sass files, in the /www directory, run

```sh
$ gulp
```

### Backend Setup

Conduit's API uses Ruby -v 2.2.2. We currently use Rackup as a development server, Rerun to watch files to restart the server, and Byebug for debugging. In order to install these dependencies, run

```sh
$ bundle install
```

An executable file is included to start up the server.

```sh
$ ./server-development
```

The only difference between the server and the server-development executable is that server-development runs rackup through rerun.

This project ofcourse also needs Apache Cassandra to get the data from. If you don't already have it installed, I highly suggest using brew

```sh
$ brew install cassandra
```

While the server is running, go to http://localhost:9999/public/index.html and you will be able to run queries to your local Cassandra keyspaces.

The Cassandra host settings are in the /config/config.yml file, currently set to localhost, but you can provide changes to the development field in that file to supply a different host.

## License

Conduit is released under the MIT License.