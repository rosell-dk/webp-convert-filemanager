export default class Poster {
  static post(action, options, successCallback) {
    var me = this;
    //console.log('Posting:' + action);
    window["wcfmoptions"].poster(action, options, function(response) {
      //console.log('response', response);
      successCallback.call(me, response);
        //successCallback(response);
      },
      function() {
        console.log('failure');
      }
    );
  }
}
