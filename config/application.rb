$LOAD_PATH.unshift(File.join(File.dirname(__FILE__), '..', 'app'))
$LOAD_PATH.unshift(File.join(File.dirname(__FILE__), '..', 'lib'))
$LOAD_PATH.unshift(File.dirname(__FILE__))

require 'boot'

Bundler.require :default, ENV['CONDUIT_ENV']

require 'active_support/core_ext/hash/transform_values'

Dir[File.expand_path('../../api/*.rb', __FILE__)].each do |file|
  require file
end

def load_config(env)
    config_file = "#{BASE_PATH}/config.yml"
    all_configs = (YAML.load_file config_file)

    unless all_configs[env]
      $stderr.puts "\n!!! #{env.inspect} is not a valid environment !!!\n\n"
      exit 666
    end

    config = all_configs[env]

    local_config_file = "#{BASE_PATH}/config.local.yml"
    local_config_for_env = {}

    if File.exists? local_config_file
      local_config = YAML.load_file(local_config_file)
      if local_config.has_key? env
        local_config_for_env = local_config[env]
      else
        $stderr.puts "WARNING: Local config override file exists but does not contain an entry for"+
          "  the #{env} environment"
      end
    end

    merged_config = Hashie::Mash.new(config).deep_merge(local_config_for_env)
    merged_config
end

BASE_PATH = File.dirname(File.absolute_path(__FILE__))
$CONFIG = load_config ENV['CONDUIT_ENV']

require 'api'