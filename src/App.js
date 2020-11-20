import React from 'react';
import './App.css';
import Board from './Board';
import AppHeader from './AppHeader';

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      serverData:{
        userId:1,
        serverName:'localhost',
        phpApiUrl:'http://45.33.26.166/home/phpwordapi/',
        phpLocalUrl:'http://peteryuanmac/myhomeapp/',
      }
    }
  }

  componentDidMount(){
    // console.log(this.state.serverData)
  }

  render(){
    return (
      <div className="App">
        <AppHeader />
        <Board serverData={this.state.serverData} />
      </div>
    );
  }
}





// function App() {
//   return (
//     <div className="App">
//       <AppHeader />
//       <Board />
//     </div>
//   );
// }

// export default App;
