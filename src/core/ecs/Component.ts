import { Entity } from './Entity'

export abstract class Component {

    public entity: Entity | null
    public name: string
}