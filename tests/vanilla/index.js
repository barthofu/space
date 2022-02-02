class Foo {

    constructor(bar) {
        this.bar = bar;
    }

    getBar() {
        return this.bar;
    }

    setBar(bar) {
        this.bar = bar;
    }

}


class System {

    constructor(foo) {
        this.foo = foo;
    }

    setBar(i) {
        this.foo.setBar(i);
    }
}



const foo = new Foo(1);
const system = new System(foo);
console.log(foo.getBar());
system.setBar(10);
console.log(foo.getBar());