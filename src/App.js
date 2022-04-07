
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from "./pages/Home";
import AddShipment from "./pages/AddShipment";
import EditShipment from "./pages/EditShipment";

/*
  Switch from npm install react-router-dom@5.2.0
  if just npm install react-router-dom, can use Routes

*/

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home}  />
        <Route exact path="/addShipment" component={AddShipment}  />
        <Route exact path="/editShipment/:id" component={EditShipment}  />
      </Switch>
      
    </div>
  );
}

export default App;
