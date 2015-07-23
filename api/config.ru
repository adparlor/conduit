require_relative 'config/environment'
run Conduit::API

use Rack::Static,
  :url => ["/public"]
  :root => File.expand_path(File.dirname(__FILE__))+"/../"