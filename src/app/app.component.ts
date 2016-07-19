import { Component } from '@angular/core';
import { Store } from './shared/store/store';
import * as Redux from 'redux';

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
    private history: Array<Object>;
    // private loggerz: Redux.Middleware;
    private loggerz: any;

    constructor() {
        this.history = [];
        this.loggerz = store => next => action => {
            this.history.push(store.getState());
            return next(action);
        }

        this.reducer1 = (s = { count1: 1 }, a) => { s.count1 += 1; return s; }
        this.reducer2 = (s = { count2: 1 }, a) => { s.count2 += 2; return s; }
        this.reducers = { 'reducer1' : this.reducer1, 'reducer2': this.reducer2 };
        this.compound = Redux.createStore(
                Redux.combineReducers(this.reducers),
                Redux.applyMiddleware(this.loggerz)
        );


        this.registerCallback();

        this.dispatchAction();
        this.dispatchAction();
        this.dispatchAction();

    }

    dispatchAction () {
        this.compound.dispatch({ type: 'SOME_ACTION' });
        this.compound.dispatch({ type: 'SOME_ACTION' });
    }

    registerCallback() {
        this.compound.subscribe(() => {
            // console.log('subscribing', this.compound.getState());
            console.log(this.history);
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





