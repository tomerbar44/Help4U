import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from "./Components/dashboard";
import Store from "./Components/store"
import ResponsiveDrawer from "./Components/responsiveDrawer";


/**   clip:
 *    https://youtu.be/hiiaHyhhwBU?t=1930
 * 
 *    material UI
 *    https://material-ui.com/
 * 
 * 
 * 
 */
// const state = {
//   isSigendIn: false,
// }


// function getContent() {
//   if (state.isSigendIn) {
//     return <p>hello user, you're signed in </p>
//   } else {
//     return (
//       <div>
//         <p>You are not signed in. Click here to sign in.</p>
//         <button id="loginButton">Login with Google</button>
//       </div>
//     )
//   }

// }


// function componentDidMount() {
//   window.gapi.load('auth2', () => {
//     auth2 = gapi.auth2.init({
//       client_id: '260896681708-o8bddcaipuisksuvb5u805vokq0fg2hc.apps.googleusercontent.com',
//     })
//   })
// }
function App() {

  //  function componentDidMount() {
  //     window.gapi.load('auth2', () => {
  //       this.auth2 = gapi.auth2.init({
  //         client_id: '260896681708-o8bddcaipuisksuvb5u805vokq0fg2hc.apps.googleusercontent.com',
  //       })
  //     })
  //   }


  {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Sample App.</h2>

        {getContent()}
      </header> */}
  return (
    <div className="App">

      <ResponsiveDrawer>
        <Store>
          <Dashboard />
        </Store>
      </ResponsiveDrawer>
    </div>
  );
}

export default App;


{/* <header className="App-header">
<div className="message-container"></div>
<form className="send-container">
  <input type="text" className="message-input"/> 
  <button type="submit" className="send-button">Send</button>
</form>
</header>  */}