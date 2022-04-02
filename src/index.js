import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import { GlobalStyle } from './index.jsx';
import SimpleReactLightbox from 'simple-react-lightbox';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <SimpleReactLightbox>
      <App />
    </SimpleReactLightbox>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals