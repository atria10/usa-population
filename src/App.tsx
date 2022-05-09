import { createContext, lazy, useEffect, useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
const States = lazy(() => import('./components/States/index'));

const themes = {
  dark: {
    background: '#011429',
    foreground: '#fff',
  },
  light: {
    background: '#fff',
    foreground: '#011429',
  }
}

export const ThemeContext = createContext(themes.light);

function App() {
  const [currentTheme, setCurrentTheme] = useState('light' as keyof typeof themes);
  const [term, setTerm] = useState<string>("");
  const [sideBar, setSideBar] = useState<boolean>(false);

  const handleCallback = (search: string) => {
    setTerm(search)
  }
  const handleSideBar = () => {
    setSideBar(!sideBar);
  }
  const handleTheme = () => {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
  }
  useEffect(() => { }, [term, setTerm]);
  return (
    <ThemeContext.Provider value={themes[currentTheme]}>
      <div style={{ backgroundColor: themes[currentTheme].background, minHeight: document.documentElement.offsetHeight }}>
        <NavBar searchTerm={handleCallback} setSideBar={handleSideBar} />
        {sideBar &&
          <SideBar setTheme={handleTheme} />}
        <States searchTerm={term} />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
