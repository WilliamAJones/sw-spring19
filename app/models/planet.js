export default class Planet {
    constructor(data) {
        if (!data.films && !data.movies) console.log(data)
        this.name = data.name
        this.diameter = data.diameter
        this.climate = data.climate
        this.population = data.population
        this.terrain = data.terrain
        this.movies = 'movies' in data ? data.movies : data.films.length
        this.url = data.url
    }

    get BasicTemplate() {
        return `<li onclick="app.controllers.pController.getPlanet('${this.url}')">${this.name}</li>`
    }

    get DetailedTemplate() {
        return `
        <h3>${this.name}</h3>
        <p>Diameter: ${this.diameter}</p>
        <p>Climate: ${this.climate}</p>
        <p>Population: ${this.population}</p>
        <p>Terrain: ${this.terrain}</p> 
        <p>Movies appeared in: ${this.movies}</p> 
        `
    }
}