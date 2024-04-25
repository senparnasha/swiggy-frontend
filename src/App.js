
import './App.css';

const App = async ()=> {
  
const data=  await fetch('http://localhost:3001/view/resturents')

const res= await data.json()
console.log(res)


  return (
    <div className="App">
      Hello World
    
    </div>
  );
}

export default App;
