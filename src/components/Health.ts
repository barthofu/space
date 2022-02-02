import { Component } from "@/core/ecs"

export class Health extends Component {

    public health: number

    constructor(health: number) {
        super()
        this.health = health
    }
    
}