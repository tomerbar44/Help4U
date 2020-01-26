import React from 'react';

<script src="https://apis.google.com/js/platform.js" async defer>
function init() {
    gapi.load('auth2', function () {
        /* Ready. Make a call to gapi.auth2.init or some other API */
    });
}</script>

const Login = {

    render: function () {
        return (
            <div>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <meta name="google-signin-client_id" content="461123082010-h32spnpnppiv8vanp1k8bh5q9nokk4mq.apps.googleusercontent.com" />
                <title>Document</title>
                <div className="g-signin2" data-onsuccess="onSignIn">sign in</div>
                <a href="#" onclick="signOut();">Sign out</a>
            </div>
        );
    }


}



export default Login;