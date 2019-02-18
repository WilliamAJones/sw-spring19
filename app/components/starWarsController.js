//private
import StarWarsService from "./starWarsService.js";


let _swService = new StarWarsService()

function drawPeople() {
    let people = _swService.People
    let template = ''
    people.forEach(p => {
        template += p.BasicTemplate
    })
    //handles people list
    document.getElementById('sw-people').innerHTML = template
    document.getElementById('buttons').innerHTML = `
    <button ${_swService.Previous ? '' : 'disabled'} onclick="app.controllers.swController.getPeople('${_swService.Previous}')">Previous Pals</button>
    <button ${_swService.Next ? '' : 'disabled'} onclick="app.controllers.swController.getPeople('${_swService.Next}')">More Pals</button>
    `
}

function drawActivePerson() {
    document.getElementById('active-person').innerHTML = _swService.ActivePerson.DetailedTemplate
}

//public
export default class StarWarsController {
    constructor() {
        //add subscribers to service
        _swService.addSubscriber('people', drawPeople)
        _swService.addSubscriber('activePerson', drawActivePerson)


        _swService.getAllApiPeople()
    }

    getPeople(url) {
        _swService.getAllApiPeople(url)
    }
    getPerson(url) {
        // debugger
        _swService.getOneApiPerson(url)
    }

}