
requirejs.config({
  baseUrl: "js/app",
  paths: {
    PromiseAdapter: "repositories/promise-adapter",
    SystemStorage: "repositories/storage/system",
    SystemDeserializer: "repositories/deserializers/system"
  }
})

require(["PromiseAdapter", "SystemStorage", "SystemDeserializer"], function(PromiseAdapter, SystemStorage, SystemDeserializer) {
  var query = {
    query: "SELECT * FROM tw_raw_promoted_tweet_facts_hourly LIMIT 1",
    keyspace: "rainmaker"
  }
  var promise = new PromiseAdapter(SystemStorage.requestQuery(query), SystemDeserializer.deserializeResult)
  promise.done(function() { console.log("done") })
})