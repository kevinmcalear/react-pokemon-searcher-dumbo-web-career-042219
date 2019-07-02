import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  state = {
    flipped: false
  }
  onClick = () => {
    this.setState({ flipped: !this.state.flipped })
  }
  handleFavorite = () => {
    this.props.onFavorite(this.props.pokemon)
  }
  render() {
    const imgUrl = this.state.flipped ? this.props.pokemon.sprites.back : this.props.pokemon.sprites.front
    const hp = this.props.pokemon.stats.find(stat => stat.name === 'hp').value

    return (
      <Card>
        <button onClick={this.handleFavorite}>⭐️</button>
        <div>
          <div className="image">
            <img onClick={this.onClick} src={imgUrl} alt="oh no!" />
          </div>
          <div className="content">
            <div className="header">{ this.props.pokemon.name }</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              { hp } hp
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
