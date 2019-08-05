import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
import {createStore , applyMiddleware ,compose} from 'redux';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import {Provider} from 'react-redux';
import './index.css';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap-theme.css';
import * as serviceWorker from './serviceWorker';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store=createStore(authReducer , composeEnhancers(applyMiddleware(thunk)));
 
const app = (
<Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</Provider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
