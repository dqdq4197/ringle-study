import React from 'react';
import {ThemeProvider} from 'styled-components';
import {GlobalTheme} from './styles/GlobalTheme';
import {ReviewPage} from './page';
import './App.css';

function App() {
  
  return (
    <div className="App">
      <ThemeProvider theme={GlobalTheme}>
        <ReviewPage />
      </ThemeProvider>
    </div>
  );
}

export default App;
