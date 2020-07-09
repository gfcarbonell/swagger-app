// React
import React from 'react';
import ReactDOM from 'react-dom';

// Material UI
import {CssBaseline} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from './utils/theme';

// Main Page
import App from './pages/App';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
    <ThemeProvider theme={theme}>
        <React.Fragment>
            <CssBaseline />
            <App />
        </React.Fragment>
    </ThemeProvider>
    ,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
