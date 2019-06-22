import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContainer from './App';
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux';
import rootReducer from './reducers';
import { Provider } from 'react-redux';

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
