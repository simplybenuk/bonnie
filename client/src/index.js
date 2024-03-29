import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import TagManager from 'react-gtm-module';

const root = ReactDOM.createRoot(document.getElementById('root'));

//identify if you are on development or production
//when you build your app process.env.NODE_ENV is set to 'production'
const env = process.env.NODE_ENV;

const tagManagerArgs = {
  gtmId: "GTM-KD7D36S",
  //the below changes GTM values based on whether dev or production
  auth: env === "development"
      ? "1eL1lnwaHj5lR14HCJsw6Q"
      : "c4mWcHzpbxwLd91NwHaIEQ",
  preview: env === "development"
    ? "env-3"
    : "env-1"
};

function GTMApp() {
  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);

  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

root.render(<GTMApp />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
