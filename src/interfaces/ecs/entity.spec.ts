import Entity from './entity.h'
import IComponent from './component.h'

class E extends Entity {}

class C1 implements IComponent { 
    entity: E
    name: string = 'C1' 
    update = (_deltaTime: number) => {}
    awake = () => {}
}
class C2 implements IComponent { 
    entity: E
    name: string = 'C2' 
    update = (_deltaTime: number) => {}
    awake = () => {}
}
class C3 implements IComponent { 
    entity: E 
    name: string = 'C3' 
    update = (_deltaTime: number) => {}
    awake = () => {}
}

describe('Entity and components', () => {

    let e: E
    const c1 = new C1()
    const c2 = new C2()
    const c3 = new C3()

    beforeEach(() => {
        e = new E()
    })

    it ('should add, remove, get and check components', () => {

        expect(e.components.length).toBe(0)
        e.addComponent(c1)
        e.addComponent(c2)
        e.addComponent(c3)
    
        expect(e.components.length).toBe(3)
        expect(e.components[0]).toBe(c1)
        expect(e.components[1]).toBe(c2)
        expect(e.components[2]).toBe(c3)
    
        e.removeComponent(C2)
        expect(e.components.length).toBe(2)
        expect(e.components[0]).toBe(c1)
        expect(e.components[1]).toBe(c3)
    
        expect(e.getComponent(C1)).toBe(c1)
        expect(e.getComponent(C3)).toBe(c3)
    
        expect(e.hasComponent(C1)).toBeTruthy()
        expect(e.hasComponent(C3)).toBeTruthy()

    })
})