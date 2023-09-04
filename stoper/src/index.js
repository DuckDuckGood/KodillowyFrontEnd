import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import './styles/global.scss'
import FlexBoxContainer from './components/FlexBoxContainer/FlexBoxContainer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FlexBoxContainer>
    <App />
  </FlexBoxContainer>
);
