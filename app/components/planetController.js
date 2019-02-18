//private
import PlanetService from "./planetService.js";


let _pService= new PlanetService

function drawPlanets() {
    let planets = _pService.Planet
    let template = ''
    planets.forEach(p => {
        template += p.BasicTemplate
    })
    //handles list
    document.getElementById('sw-planets').innerHTML = template
    document.getElementById('p-buttons').innerHTML = `
    <button ${_pService.Previous ? '' : 'disabled'} onclick="app.controllers.pController.getPlanets('${_pService.Previous}')">Previous Planets</button>
    <button ${_pService.Next ? '' : 'disabled'} onclick="app.controllers.pController.getPlanets('${_pService.Next}')">More Planets</button>
    `
}

function drawActivePlanet() {
    document.getElementById('active-planet').innerHTML = _pService.ActivePlanet.DetailedTemplate
}

//public
export default class PlanetController {
    constructor() {
        //add subscribers to service
        _pService.addSubscriber('planets', drawPlanets)
        _pService.addSubscriber('activePlanet', drawActivePlanet)


        _pService.getAllApiPlanets()
    }

    getPlanets(url) {
        _pService.getAllApiPlanets(url)
    }
    getPlanet(url) {
        _pService.getOneApiPlanet(url)
    }

}