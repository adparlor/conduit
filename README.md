# Conduit

Conduit is a database manager for Apache Cassandra that runs in the browser. The backend is written in Grape, and the frontend uses Backbone.Marionette.

## Frontend Setup

We use Handlebars for templating. In order to precompile these templates, along with all sass files, we use Gulp. The package.json file is set-up so you should be able to install both these packages by running

```sh
$ npm install
```

Give permissions if necessary.
If you receive the warning, "cannot run in wd", run

```sh
$ npm install --unsafe-perm
```

While developing for the frontend, in order to watch for any changes to templates and sass files, run

```sh
$ gulp
```

## Backend Setup

Conduit's API uses Ruby -v 2.2.2. We currently use Rackup as a development server, Rerun to watch files to restart the server, and Byebug for debugging. In order to install these dependencies, run

```sh
$ gem install rack
$ gem install rerun
$ gem install byebug
```

Give permissions if necesssary.
After you've installed those, in order to install the rest of the local dependencies, run

```sh
$ bundle install
```

An executable file is included in the /api folder to start up the server.

```sh
$ ./server
```

This project ofcourse also needs Apache Cassandra to get the data from. If you don't already have it installed, I highly suggest using brew

```sh
$ brew install cassandra
```

The Cassandra host settings are in the /api/config.yml file, currently set to localhost, but you can provide changes to that file to supply a different host.

## License

Conduit is released under the MIT License.