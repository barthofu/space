type state = { [key: string]: any }

export class StateManager {

    private _states: state = {}

    public get states() : state {
        return this._states
    }

    public addState(key: string, value: any) {
        this._states[key] = value
    }

    public removeState(key: string) {
        delete this._states[key]
    }

    public getState(key: string) : any {
        return this._states[key]
    }

    public hasState(key: string) : boolean {
        return this._states.hasOwnProperty(key)
    }

    public clear() {
        this._states = {}
    }

    public getStateKeys() : string[] {
        return Object.keys(this._states)
    }

    public getStateValues() : any[] {
        return Object.values(this._states)
    }

    public getStateEntries() : [string, any][] {
        return Object.entries(this._states)
    }

    public getStateSize() : number {
        return Object.keys(this._states).length
    }

}