
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Header from "./component/Header";
import Home from "./component/Home"
import Coin from "./component/Coin"
import Exchange from "./component/Exchange"
import CoinDetail from "./component/CoinDetail";
import Footer from "./component/Footer";
function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/coin" element={<Coin/>}/>
        <Route path="/exchange" element={<Exchange/>}/>
        <Route path="/coin/:id" element={<CoinDetail/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
