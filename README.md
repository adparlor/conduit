# Conduit

Conduit is a database manager for Apache Cassandra that runs in the browser. The backend is written in Grape, and the frontend uses Backbone.Marionette.

## Frontend Setup

We use Handlebars for templating. In order to precompile these templates, along with all sass files, we use Gulp. The package.json file is set-up so you should be able to install both these packages by running

```sh
$ npm install
```

give permissions if necessary. If it gives the warning

```sh
WARN cannot run in wd
```

run

```sh
$ npm install --unsafe-perm
```

again with permissions if necessary.
While developing for the frontend, run

```sh
$ gulp
```

in order to watch for any changes to templates and sass files.

## Backend Setup

Conduit's API uses Ruby -v 2.2.2. We currently use Rackup as a development server, Rerun to watch files to restart the server, and Byebug for debugging. In order to install these dependencies, run

```sh
$ gem install rack
$ gem install rerun
$ gem install byebug
```

with permissions if necesssary. After you've installed those, run

```sh
$ bundle install
```

in order to install the rest of the local dependencies. An executable file is included in the /api folder to start up the server.

```sh
$ ./server
```

This project ofcourse also needs Apache Cassandra to get the information from. If you don't already have it installed, I highly suggest using brew

```sh
$ brew install cassandra
```

The Cassandra host settings are in the /api/config.yml file, currently set to localhost, but you can provide changes to that file to supply a different host.