angular.module('myApp')

  .service('editor', ['fire', '$firebaseObject',
    function (fire, $firebaseObject) {

      var binder, page;
      this.bind = function ($scope, varName, _page) {

        page = _page;
        binder = function (ref) {
          var syncObject = $firebaseObject(ref.child('pages/' + page));
          syncObject.$bindTo($scope, varName);
        };
        connect(false);
      };

      this.makeHistoryEntry = function (done) {
        var historyRecord = 'history/' + page + '/' + moment.format();
        historyRecord = ref.child(historyRecord);
        var current = ref.child('pages/' + page);
        historyRecord.save(current, done);
      };

      // for fugure:
      this.requestAdminAccess = function () {
        if (binder) connect(true);
      };

      var cachedRef;

      function connect(admin, done) {
        if (cachedRef) return done(cachedRef);
        fire.getRef(admin, function (_ref) {
          cachedRef = _ref;
          done(cachedRef);
        });
      }

    }])

  .config(function ($provide) {
    // this demonstrates how to register a new tool and add it to the default toolbar
    $provide.decorator('taOptions', ['taRegisterTool', '$delegate', 'editor',
      function (taRegisterTool, taOptions, editor) { // $delegate is the tHaOptions we are decorating

        taRegisterTool('save', {
          buttontext: 'Save',
          action: editor.makeH
        });

        taOptions.toolbar = [
          ['h1', 'h2', 'h3', 'p', 'pre', 'quote'],
          ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
          ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
          ['html', 'insertImage', 'insertLink', 'insertVideo'],
          ['save']
        ];

        return taOptions;
      }]);


  });