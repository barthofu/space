

import { Entity } from '../src/core/ecs/index'

class Foo extends Entity {}

class Bar extends Entity {}

describe('Entities Hierarchy', () => {

    const foo = new Foo()
    const bar1 = new Bar()
    const bar2 = new Bar()
    const subFoo = new Bar()

    foo.addEntity(bar1)
    foo.addEntity(bar2)

    bar1.addEntity(subFoo)

    it ('should get all entities', () => {

        expect(foo.getAllEntities().length).toBe(3)
        expect(foo.getAllEntities()[0]).toBe(bar1)
        expect(foo.getAllEntities()[1]).toBe(bar2)

        expect(bar1.getAllEntities().length).toBe(1)
        expect(bar1.getAllEntities()[0]).toBe(subFoo)

    })
})