require_relative 'config/environment'

use Rack::Static,
  :urls => ['/public'],
  :root => File.expand_path(File.dirname(__FILE__))+"/www"

run Conduit::API