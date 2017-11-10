import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware  } from 'redux';
import promise from 'redux-promise';
import 'bootstrap/dist/css/bootstrap.css';

import './index.css';
import reducers from './reducers';
import PostIndex from './components/post_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';
import registerServiceWorker from './registerServiceWorker';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={ createStoreWithMiddleware(reducers) } >
        <BrowserRouter>
            <div className="container">
                <Switch>
                    <Route path='/posts/new' exact component={PostsNew} />
                    <Route path='/posts/:id' component={PostsShow} />
                    <Route path='/' component={PostIndex} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
