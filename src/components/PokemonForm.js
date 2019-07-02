import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {
  state = {
    name: '',
    hp: '',
    frontUrl: '',
    backUrl: ''
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value })
  }

  handleHpChange = (e) => {
    this.setState({ hp: e.target.value })
  }

  handleFrontUrlChange = (e) => {
    this.setState({ frontUrl: e.target.value })
  }

  handleBackUrlChange = (e) => {
    this.setState({ backUrl: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onNewPokemon(this.state)
    // optionally, we can clear the form now
    this.setState({ name: '', hp: '', frontUrl: '', backUrl: '' })
  }

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input onChange={this.handleNameChange} value={this.state.name} fluid label="Name" placeholder="Name" name="name" />
            <Form.Input onChange={this.handleHpChange} value={this.state.hp} fluid label="hp" placeholder="hp" name="hp" />
            <Form.Input onChange={this.handleFrontUrlChange} value={this.state.frontUrl} fluid label="Front Image URL" placeholder="url" name="frontUrl" />
            <Form.Input onChange={this.handleBackUrlChange} value={this.state.backUrl} fluid label="Back Image URL" placeholder="url" name="backUrl" />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
