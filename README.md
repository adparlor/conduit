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