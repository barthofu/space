import { IAwake, IUpdate } from "../lifecycle/lifecycle.h"
import Entity from './entity.h'

export default interface IComponent extends IUpdate, IAwake {

    entity: Entity | null
    name: string
}