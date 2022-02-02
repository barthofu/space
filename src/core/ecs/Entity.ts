import { IAwake, IUpdate } from "@interfaces/lifecycle/lifecycle.h"
import { Component } from "./Component"

export abstract class Entity implements IUpdate, IAwake {

    protected _components : Component[] = []
	protected tag: string | undefined

	// Game Loop

	public update(deltaTime: number): void {
		for (const component of this._components) {
			component.update(deltaTime)
		}
	}

	public awake(): void {
		for (const component of this._components) {
			component.awake()
		}
	}

	// Tag

	public setTag(tag: string): void {
		this.tag = tag
	}

	public getTag(): string | undefined {
		return this.tag
	}

	// Components 

    public get components() : Component[] {
        return this._components
    }

    public addComponent(component : Component) {
        component.entity = this
        this._components.push(component)
    }
    
    public getComponent<C extends Component>(constr: constr<C>): C | undefined {
		
		for (const component of this._components) {
			if (component instanceof constr) {
				return component as C
			}
		}
		// throw new Error(`Component ${constr.name} not found on Entity ${this.constructor.name}`)
		return undefined
	}

	public removeComponent<C extends Component>(constr: constr<C>): void {

		let toRemove: Component | undefined
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

	public hasComponent<C extends Component>(constr: constr<C>): boolean {
		for (const component of this._components) {
			if (component instanceof constr) {
				return true
			}
		}
		return false
	}

}