$LOAD_PATH.unshift(File.join(File.dirname(__FILE__), '..', 'app'))
$LOAD_PATH.unshift(File.join(File.dirname(__FILE__), '..', 'lib'))
$LOAD_PATH.unshift(File.dirname(__FILE__))

require 'boot'

Bundler.require :default, ENV['CONDUIT_ENV']

require 'really_confy'
require 'active_support/core_ext/hash/transform_values'

Dir[File.expand_path('../../api/*.rb', __FILE__)].each do |file|
  require file
end

def load_config
  options = {
    env_var_name: 'CONDUIT_ENV',
    config_files: ['config.yml'],
    required_config_files: ['config.yml']
  }
  ReallyConfy.new(options).load
end

BASE_PATH = File.dirname(File.absolute_path(__FILE__))
$CONFIG = load_config

require 'api'
