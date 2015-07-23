
define([], function() {
  return function PromiseAdapter(promise, dataParser, errorsParser, options){

    var deferred = $.Deferred();
    var options = options || (options = {skipParsingOnFailure: true, handleAuthentication: true})

    if(options.skipParsingOnFailure === undefined){
      options.skipParsingOnFailure = true
    }
    if(options.handleAuthentication === undefined){
      options.handleAuthentication = true
    }

    if(errorsParser === undefined){
      errorsParser = function(r){return null}
    }

    promise.done(function(response) {
      if(typeof response === "string"){
        try{
          response = $.parseJSON(response)
        }catch(e){
          console.log(response)
          response = {message: "An unknown error has occurred."}

          return deferred.reject(response, errorsParser(response))
        }
      }
      deferred.resolve(dataParser(response))
    });

    promise.fail(function(xhr){
      if(xhr && xhr.statusText == "abort"){
        return
      }
      // if(options.handleAuthentication && xhr && xhr.status == 403){
      //   localStorage.removeItem("WSSE")
      //   window.location.reload(true)
      //   return
      // }

      var data
      var response = xhr.responseText
      if(response === ""){
        response = {}
      }

      if(typeof response === "string"){
        try{
          response = $.parseJSON(xhr.responseText)
        }catch(e){
          response = {message: "An unknown error has occurred."}
        }
      }

      if(! options.skipParsingOnFailure){
        data = dataParser(response)
      }else{
        data = response
      }

      deferred.reject(data, errorsParser(response))
    })


    var new_promise = deferred.promise()

    new_promise.abort = function(){
      if(promise.abort) promise.abort()
    }

    return new_promise
  }
})