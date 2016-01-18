angular.module('myApp')
.service('fire', ['$q', 
function($q) {

    var ref = new Firebase("https://blazing-fire-6416.firebaseio.com");

    this.getRef = function(admin, done) {
        var authData = ref.getAuth();
        if (authData && (!admin || authData.provider == 'github')) {
            console.log("User " + authData.uid + " is logged in with " + authData.provider);
            done(ref);
        } else {
            login(admin, done);
        }
    };

    function login(admin, done) {

if (deep)
        ref.authWithOAuthPopup("github", after);
else 
     ref.authAnonymously(after);

function after(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                done(ref);
            }
        }

    }
    
}]);