import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { DataProvider } from './context/DataContext';
import TopBar from './components/TopBar';
import Home from './components/Home';
import AddBim from './components/AddBim';
import AddWorker from './components/AddWorker';
import AddMachine from './components/AddMachine';
import AddProduction from './components/AddProduction';
import ProductionList from './components/ProductionList';
import Report from './components/Report';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <DataProvider>
        <Router>
          <TopBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-bim" element={<AddBim />} />
            <Route path="/add-worker" element={<AddWorker />} />
            <Route path="/add-machine" element={<AddMachine />} />
            <Route path="/add-production" element={<AddProduction />} />
            <Route path="/production-list" element={<ProductionList />} />
            <Route path="/report" element={<Report />} />
          </Routes>
        </Router>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
