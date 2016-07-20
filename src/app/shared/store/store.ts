// import * as Redux from 'redux';
// import { Reducers } from '../reducers';

type NameOrResolver = String|Number;

export class Store<NameOrResolver> {
    // private store: Redux.Store<Object>;

    constructor() {
        // this.store = Redux.createStore(Redux.combineReducers(Reducers));
    }

    // get<T>(arg: T): T {
    get<NameOrResolver>(arg: NameOrResolver): NameOrResolver {
        return arg;
    }

    dispatch() {
        //
    }
}
