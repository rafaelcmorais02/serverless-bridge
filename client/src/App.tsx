import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Header } from './components/custom/Header';
import Home from './pages/Home';

function App() {
    return (
        <main>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
        </main>
    );
}

export default App;
