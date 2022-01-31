import Entity from './entity.h'

export default interface IComponent {

    entity: Entity | null,
    name: string,

}