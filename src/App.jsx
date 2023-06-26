import './App.css';
import { Tabuleiro } from './Components/tabuleiro';
import { XadrezProvider } from './Contexts';

function App() {
  return (
    <div className="App">
      <XadrezProvider>
      <Tabuleiro/>
      </XadrezProvider>
    </div>
  );
}

export default App;
