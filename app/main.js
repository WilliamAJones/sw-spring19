import StarWarsController from "./components/starWarsController.js";
import PlanetController from "./components/planetController.js";

class App {
    constructor() {
        this.controllers = {
            swController: new StarWarsController(),
            pController: new PlanetController()     }
    }
}



window['app'] = new App()