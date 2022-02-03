class Animal {

    name: string

    constructor(name: string) {
        this.name = name
    }
}

class Cat extends Animal {

    color: string

    constructor(color: string, name:string) {
        super(name)
        this.color = color
    }
}

function foo(animal: Animal) {
    console.log(animal)
}

const cat = new Cat('red', 'Meow')
foo(Cat)