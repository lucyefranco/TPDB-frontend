import React from 'react';
import { Link } from 'react-router-dom';
import { Component } from 'react';
import FavoritesModel from '../models/favorites'
import DisplayFavorites from '../components/DisplayFavorites'

class Profile extends Component {
  state = {
    userId: localStorage.getItem('id'),
    favoriteAttractions: [],
    favoriteParks: [],
    favoriteCreatives: []
  }

  componentDidMount() {
    this.findFavoriteAttractions()
    this.findFavoriteParks()
    this.findFavoriteCreatives()
  }

  findFavoriteAttractions = () => {
    FavoritesModel.userAttractions(this.state.userId).then(data => {
      this.setState({ favoriteAttractions: data.attractionFavorites})
    })
  }
  deleteFavoriteAttraction = (id) => {
      FavoritesModel.deleteAttraction(id).then((res) => {
      this.findFavoriteAttractions()
    })
  }
  findFavoriteParks = () => {
    FavoritesModel.userParks(this.state.userId).then(data => {
      console.log(data)
      this.setState({ favoriteParks: data.themeParkFavorites })
    })
  }
  deleteFavoritePark = (id) => {
    FavoritesModel.deletePark(id).then((res) => {
      this.findFavoriteParks()
    })
  }
  findFavoriteCreatives = () => {
    FavoritesModel.userCreatives(this.state.userId).then(data => {
      console.log(data)
      this.setState({ favoriteCreatives: data.creativeFavorites })
    })
  }
  deleteFavoriteCreative = (id) => {
    FavoritesModel.deleteCreative(id).then((res) => {
      this.findFavoriteCreatives()
    })
  }

  render () {
    let attractionsList = this.state.favoriteAttractions && this.state.favoriteAttractions.map((attraction, index) => {
      return (
          <div>
              <Link to={ `/attractions/${attraction.attractionId}` } className="seeMoreLink">
              <DisplayFavorites { ...attraction } key={ index } />
              </Link>
              <button onClick={ e => {this.deleteFavoriteAttraction(attraction.id)}
              }> Remove </button>
          </div>
      )
    })

    let parksList = this.state.favoriteParks && this.state.favoriteParks.map((park, index) => {
      return (
          <div>
              <Link to={ `/themeParks/${park.themeParkId}` }  className="seeMoreLink">
              <DisplayFavorites { ...park } key={ index } />
              </Link>
              <button onClick={ e => {this.deleteFavoritePark(park.id)}
              }> Remove </button>
          </div>
      )
    })

    let creativesList = this.state.favoriteCreatives && this.state.favoriteCreatives.map((creative, index) => {
      return (
          <div>
              <Link to={ `/creatives/${creative.creativeId}` } className="seeMoreLink" >
              <DisplayFavorites { ...creative} key={ index } />
              </Link>
              <button onClick={ e => {this.deleteFavoriteCreative(creative.id)}
              }> Remove </button>
          </div>
      )
    })

    return (
      <div>
      <h2>Welcome</h2>
        <h3>View Your Favorites</h3>
        <div className="profileContent">
        <div className="profileColumn">
          <h4>Attractions</h4>
          { this.state.favoriteAttractions ? attractionsList : "You have not favorited any attraction!" }
        </div>
        <div className="profileColumn">
          <h4>Theme Parks</h4>
          { this.state.favoriteParks ? parksList : "You have not favorited any Theme Parks!" }
        </div>
        <div className="profileColumn">
        <h4>Creatives</h4>
          { this.state.favoriteCreatives ? creativesList : "You have not favorited any Creatives!" }
        </div>
      </div>
      </div>
    )
  }
}

export default Profile