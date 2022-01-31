import IComponent from "./component.h"

type constr<T> = new (...args: any[]) => T

export default abstract class Entity {

    protected _components : IComponent[] = []


	// Components 

    public get components() : IComponent[] {
        return this._components
    }

    public addComponent(component : IComponent) {
        component.entity = this
        this._components.push(component)
    }
    
    public getComponent<C extends IComponent>(constr: constr<C>): C {
		
		for (const component of this._components) {
			if (component instanceof constr) {
				return component as C
			}
		}
		throw new Error(`Component ${constr.name} not found on Entity ${this.constructor.name}`)
	}

	public removeComponent<C extends IComponent>(constr: constr<C>): void {

		let toRemove: IComponent | undefined
		let index: number | undefined
	
		for (let i = 0; i < this._components.length; i++) {
			const component = this._components[i]
			if (component instanceof constr) {
				toRemove = component
				index = i
				break
			}
		}
	
		if (toRemove && index) {
			toRemove.entity = null
			this._components.splice(index, 1)
		}
	}

	public hasComponent<C extends IComponent>(constr: constr<C>): boolean {
		for (const component of this._components) {
			if (component instanceof constr) {
				return true
			}
		}
		return false
	}

}