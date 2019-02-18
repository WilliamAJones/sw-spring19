//private
import Planet from "../models/planet.js";

//Creates an object to send requests from
let _planetApi = axios.create({
    baseURL: 'https://swapi.co/api/planets'
})


let _state = {
    planets: [],
    nextPrevPlanet: {
        nextUrl: '',
        previousUrl: ''
    },
    activePlanet: {}
}

let _subscribers = {
    planets: [],
    nextPrevPlanet: [],
    activePlanet: []
}

//HANDLES ALL ASYNC
function setState(prop, value) {
    _state[prop] = value
    _subscribers[prop].forEach(fn => fn());
}


//public
export default class PlanetService {
    addSubscriber(prop, fn) {
        _subscribers[prop].push(fn)
    }
    //get local data
    get Planet() {
        //Breaks Refrences of each object in state
        return _state.planets.map(p => new Planet(p))
    }

    get Next() {
        return _state.nextPrevPlanet.nextUrl
    }

    get Previous() {
        return _state.nextPrevPlanet.previousUrl
    }

    get ActivePlanet() {
        //Creates a new object (breaking refrence)
        return new Planet(_state.activePlanet)
    }

    //make a call to swapi api to get all planets
    getAllApiPlanets(url = '') {
        _planetApi.get(url)
            //Happens after data comes back
            .then(response => {
                //all axios requests return 'data' in the response
                let planets = response.data.results.map(d => new Planet(d))
                console.log(planets)
                let urlData = {
                    nextUrl: response.data.next,
                    previousUrl: response.data.previous
                }
                
                setState('nextPrevPlanet', urlData)
                setState('planets', planets)
            })
            .catch(err => {
                console.error(err)
            })
    }
    getOneApiPlanet(url) {
        _planetApi.get(url)
            .then(res => {
                setState('activePlanet', new Planet(res.data))
            })
            .catch(err => {
                console.error(err)
            })
    }

}