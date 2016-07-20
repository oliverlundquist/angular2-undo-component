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

    private reducer1: Redux.Reducer<Object>;
    private reducer2: Redux.Reducer<Object>;
    private reducers: Redux.ReducersMapObject;
    private compound: Redux.Store<Object>;
    private history: Immutable.List<Object>;
    // private loggerz: Redux.Middleware;
    private loggerz: any;
    private lister: Immutable.List<Object>;

    constructor() {
        this.history = Immutable.List.of({});
        this.loggerz = store => next => action => {
            // let newState = Immutable.fromJS(store.getState()).toObject();
            this.history = this.history.push(store.getState().reducer1.toArray()
                                                .concat(store.getState().reducer2.toArray()));
            // console.log(this.history.toArray());
            return next(action);
        }

        this.reducer1 = (s = Immutable.Map({ count1: 0 }), a) => s.set('count1', (s.get('count1') + 1))
        this.reducer2 = (s = Immutable.Map({ count2: 0 }), a) => s.set('count2', (s.get('count2') + 2))
        this.reducers = { 'reducer1' : this.reducer1, 'reducer2': this.reducer2 };
        this.compound = Redux.createStore(
                Redux.combineReducers(this.reducers),
                Redux.applyMiddleware(this.loggerz)
        );


        this.registerCallback();

        this.dispatchAction();
        // this.dispatchAction();
        // this.dispatchAction();

    }

    dispatchAction () {
        this.compound.dispatch({ type: 'SOME_ACTION' });
        this.compound.dispatch({ type: 'SOME_ACTION' });
        this.compound.dispatch({ type: 'SOME_ACTION' });
    }

    registerCallback() {
        this.compound.subscribe(() => {
            // console.log('subscribing', this.compound.getState());
            console.log(this.history.toArray());
        })
    }

}

// type Mixtype = String|Number;

// class SomeClass<T extends Mixtype> {
//     somemethod(arg: T): T {
//         return arg;
//     }
// }

// var somevar = new SomeClass<Number>();
// console.log(somevar.somemethod(123));
// console.log(somevar.somemethod('hey')); // error
// console.log(somevar.somemethod(true)); // error





