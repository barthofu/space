import { Component } from "./Component"
import { v4 as uuidv4 } from "uuid"

export abstract class Entity {

    protected _components : Component[] = []
	protected _id: string = uuidv4()
	protected _tag: string | undefined
	protected _childs: Entity[] = []
	protected _parent: Entity | undefined

	// Id
	
	public get id(): string {
		return this._id
	}

	public set id(id: string) {
		this._id = id
	}

	// Tag

	public set tag(tag: string) {
		this._tag = tag
	}

	public get tag(): string {
		if (!this._tag) return ''
		return this._tag
	}

	// Childs

	public addChild(child: Entity) {
		this._childs.push(child)
	}

	public removeChild(child: Entity) {
		this._childs = this._childs.filter(c => c !== child)
	}

	public get childs() : Entity[] {
		return this._childs
	}

	// Parent

	public set parent(parent: Entity | undefined) {
		this._parent = parent
	}

	public get parent() : Entity | undefined {
		return this._parent
	}

	// Components 

    public get components() : Component[] {
        return this._components
    }

    public addComponent(component : Component) {
        component.entity = this
        this._components.push(component)
    }
    
    public getComponent<C extends Component>(constr: Class<C>): C | undefined {
		
		for (const component of this._components) {
			if (component instanceof constr) {
				return component as C
			}
		}
		// throw new Error(`Component ${constr.name} not found on Entity ${this.constructor.name}`)
		return undefined
	}

	public removeComponent<C extends Component>(constr: Class<C>): void {

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

	public hasComponent<C extends Component>(constr: Class<C>): boolean {
		for (const component of this._components) {
			if (component instanceof constr) {
				return true
			}
		}
		return false
	}

	public matchComponents(includes: any[], excludes: any[]): boolean {
		
		const hasRequiredComponents = includes.every(component => this.hasComponent(component))
		const hasNotExcludedComponents = excludes.every(component => !this.hasComponent(component))

		return hasRequiredComponents && hasNotExcludedComponents
	}

}