import { Component } from "@ecs"

export class Size extends Component {


    public width: number
    public height: number

    constructor(width: number, height: number) {
        super()

        this.width = width
        this.height = height
    }
    

}