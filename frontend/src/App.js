import React from 'react';
import "tailwindcss/dist/tailwind.min.css"
import './App.css';

// Components
import CreateProject from './components/CreateProject';

function App() {
  return (
    <div className="overflow-hidden">
        <CreateProject/>
    </div>
  );
}

export default App;
 