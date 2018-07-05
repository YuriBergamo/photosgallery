import React from 'react'
import { NavLink } from 'react-router-dom'

class CardDashboard extends React.Component {

    constructor(){
        super();
    }

    getLikes(){
        if(this.props.likes){
            return this.props.likes;
        }
        return 0;
    }

    getIGiveALike(){
        let retorno = " fa ";
        if(this.props.likes ==0) return "";
        return retorno += "fa-heart";
    }

    render(){
        return (

            <div className="column is-one-third has-shadow">
                <div className="card large">
                    <div className="card-image">
                        <figure className="image">
                            <img src={this.props.image}/>
                        </figure>
                    </div>
                    <div className="card-content">
                        {/*<div class="level is-mobile">*/}
                            {/*<div class="level-left">*/}
                                {/*<div class="level-item has-text-centered">*/}
                                    {/*<a href="">*/}
                                        {/*<FavoriteBorderIcon/>*/}
                                        {/*/!*<i class="material-icons">favorite_border</i>*!/*/}
                                    {/*</a>*/}
                                {/*</div>*/}
                                {/*<div class="level-item has-text-centered">*/}
                                    {/*<div>*/}
                                        {/*<a href="">*/}
                                            {/*<ChatIcon/>*/}
                                            {/*/!*<i class="material-icons">chat_bubble_outline</i>*!/*/}
                                        {/*</a>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                        <div className="media">
                            <a className="button is-danger is-outlined" style={{width:"100%"}}>
                                <span>{this.getLikes()} Likes </span>
                                <span class="icon is-small">
                                    <i className={this.getIGiveALike()} style={{marginLeft:"25px"}}></i>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default CardDashboard