import './App.css';
import CurrencyConverter from './components/CurrencyConverter';
import TipCalculator from './components/TipCalculator'

function App() {
    return (
        <div className="container">
            <CurrencyConverter />
            <TipCalculator />
        </div>
    );
}

export default App;
