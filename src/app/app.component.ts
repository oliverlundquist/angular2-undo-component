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
        this.manager = this.stateManager.bind(this);
        this.state   = Redux.createStore(this.reducer, Redux.applyMiddleware(this.manager));

        // setup subscriber
        this.state.subscribe(this.stateHandler.bind(this));

        // fire event
        this.state.dispatch({ type: 'SOME_ACTION' });
        this.state.dispatch({ type: 'SOME_ACTION' });
        this.state.dispatch({ type: 'SOME_ACTION' });
    }

    clickFunction() {
        console.log('click click');
    }

    stateReducer(state:Immutable.Map<String,Object>, action):Immutable.Map<String,Object> {
        if (typeof state === 'undefined') { return Immutable.Map({ time: this.getTimestamp() }) }
        return state.set('time', this.getTimestamp());
    }

    stateHandler():void {
        //
    }

    stateManager(store):Redux.Dispatch<Object> {
        return next => action => {
            // Before Middleware
            // ...

            // Fire Reducers & Subscribers
            let result = next(action);

            // After Middleware
            this.history = typeof this.history === 'undefined' ?
                                    this.history = Immutable.List.of(store.getState().toJS()) :
                                    this.history = this.history.push(store.getState().toJS());

            // End of Lifecycle
            return result;
        }
    }

    getTimestamp():Number {
        return +(new Date()).getTime();
    }

}
