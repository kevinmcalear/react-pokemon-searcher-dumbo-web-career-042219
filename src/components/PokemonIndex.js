import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {
  state = {
    pokemon: [],
    favorites: [],
    searchTerm: ''
  }

  handleSearch = (e) => {
    this.setState({ searchTerm: e.target.value })
  }

  handleNewPokemon = (pokemonData) => {
    const newPokemon = {
        name: pokemonData.name,
        stats: [
          {
            value: pokemonData.hp,
            name: "hp"
          }
        ],
        sprites: {
          front: pokemonData.frontUrl,
          back: pokemonData.backUrl
        }
    }

    fetch('http://localhost:3000/pokemon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(newPokemon)
    })
      .then(res => res.json())
      .then(pokemonResponse => this.setState({ pokemon: [...this.state.pokemon, pokemonResponse] }))
  }

  handleFavorite = (pokemon) => {
    // check to make sure we don't add a pokemon if we already have it
    const foundPokemon = this.state.favorites.find(pokeData => pokeData.id === pokemon.id)
    
    if (!foundPokemon) {
      this.setState({ favorites: [...this.state.favorites, pokemon] })
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/pokemon')
      .then(res => res.json())
      .then(pokemonData => this.setState({ pokemon: pokemonData }))
  }

  render() {
    const filteredPokemon = this.state.pokemon.filter(pokeData => pokeData.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <input type="search" onChange={this.handleSearch} value={this.state.searchTerm} />
        <br />
        <PokemonCollection onFavorite={this.handleFavorite} pokemon={filteredPokemon} />
        <h3>Favorites</h3>
        <PokemonCollection pokemon={this.state.favorites} />
        <br />
        <PokemonForm onNewPokemon={this.handleNewPokemon} />
      </div>
    )
  }
}

export default PokemonPage
