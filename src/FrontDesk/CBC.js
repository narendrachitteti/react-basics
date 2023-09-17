import React, { Component } from 'react'

export default class CBC extends Component {
  state ={
    name :"Function component"
  }
  render() {
    return (
      <div>
        <p>Iam a {this.state.name}</p>
      </div>
    )
  }
}
