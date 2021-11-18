export default class Poster {
  static post(action, options, successCallback) {
    var me = this;
    //console.log('Posting:' + action, options);

    // TODO: Find another way, which doesn't pollute window
    // IE: https://vuejs.org/v2/cookbook/adding-instance-properties.html
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
