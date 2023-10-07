import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { FabComponent } from "@syncfusion/ej2-react-buttons";
import HeaderBasic from './Header';
import { MantineProvider } from '@mantine/core';
import FAB from './ActionButton';


function App() {
  const [count, setCount] = useState(0)
  return (
    <MantineProvider>
      <HeaderBasic/>
      <FAB />
    </MantineProvider>
  )
}

export default App
