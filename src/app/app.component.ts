import { Component } from '@angular/core';
import { Store } from './shared/store/store';
import * as Redux from 'redux';
import * as Immutable from 'immutable';

@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent {
    title = 'app works!';

    private reducer: Redux.Reducer<Object>;
    private state: Redux.Store<Object>;
    private history: Immutable.List<Object>;
    private manager: Redux.Middleware;

    constructor() {
        this.reducer = this.stateReducer.bind(this);
        this.history = Immutable.List.of({});
        this.manager = this.stateManager.bind(this);
        this.state   = Redux.createStore(this.reducer, Redux.applyMiddleware(this.manager));

        // setup subscriber
        this.state.subscribe(this.stateHandler.bind(this));

        // fire event
        this.state.dispatch({ type: 'SOME_ACTION' });
        // this.state.dispatch({ type: 'SOME_ACTION' });
    }

    stateReducer(state:Immutable.Map<String,Number>, action:Object) {
        let timestamp = +(new Date()).getTime();
        if (typeof state === 'undefined') { return Immutable.Map({time: timestamp}) }
        console.log(state.toJS());
        return state.set('time', timestamp);
    }

    stateHandler() {
        //
    }

    stateManager(store):Redux.Dispatch<Object> {
        return next => action => {
            // Before Middleware
            // ...

            // Fire Reducers & Subscribers
            let result = next(action);

            // After Middleware
            this.history = this.history.push(store.getState().toJS());

            // End of Lifecycle
            return result;
        }
    }

}
