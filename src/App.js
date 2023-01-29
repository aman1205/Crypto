
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Header from "./component/Header";
import Home from "./component/Home"
import Coin from "./component/Coin"
import Exchanges from "./component/Exchange"
import CoinDetail from "./component/CoinDetail";
function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/coin" element={<Coin/>}/>
        <Route path="exchanges" element={<Exchanges/>}/>
        <Route path="/coindetail" element={<CoinDetail/>}/>
      </Routes>
    </Router>
  );
}

export default App;
