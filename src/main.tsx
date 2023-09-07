import ReactDOM from 'react-dom/client'
import {App} from './App'
import './index.scss'
import {HashRouter} from "react-router-dom";
import {store} from "./app/store";
import {Provider} from "react-redux";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <HashRouter>
            <App/>
        </HashRouter>
    </Provider>
)
