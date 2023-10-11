import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { FilterProvider } from './contexts/filtersContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <FilterProvider>
             <App />
        </FilterProvider>
     </Provider>
 );

