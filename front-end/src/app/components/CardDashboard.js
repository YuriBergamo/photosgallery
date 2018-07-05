import React from 'react'
import { NavLink } from 'react-router-dom'
import Connection from "../connections/Connection";
import AuthenticationService from "./services/AuthenticationService";

class CardDashboard extends React.Component {

    constructor(){
        super();
        this.likeIt = this.likeIt.bind(this);
        this.approvedIt = this.approvedIt.bind(this);
        this.Auth = new AuthenticationService();
        this.state = {
            likes:0
        };
    }

    componentDidMount(){
        let buttonApproved = <button className="button is-info" style={{width:"100%"}}
                                     onClick={this.approvedIt}>
                                    <span> Need to be approved </span>
                                    <span class="icon is-small">
                                        <i className="fa fa-heart" style={{marginLeft:"25px"}}></i>
                                    </span>
                             </button>;

        let buttonLike = <button className="button is-danger" style={{width:"100%"}}
                                 onClick={this.likeIt}>
                            <span> Like it! </span>
                            <span class="icon is-small">
                                <i className="fa fa-heart" style={{marginLeft:"25px"}}></i>
                            </span>
                         </button>;


        if(this.props.approved == false){
            // just allow by admins
            this.setState({
                likes:this.props.likes,
                approved:this.props.approved,
                button:buttonApproved
            })
        }else{
            this.setState({
                likes:this.props.likes,
                approved:this.props.approved,
                button:buttonLike
            });
        }

    }

    likeIt(e){
        e.preventDefault();
        // call method to like photo
        Connection.post("/photos/like", {
            "id":this.props.id
        }).then(res =>{
            console.log(res);
            this.setState({
                likes:res.likes
            });
        })
    }

    approvedIt(e){
        e.preventDefault();
        Connection.post("/photos/approve/" + this.Auth.getIdUser(), {
            "id":this.props.id
        }).then(res =>{
            console.log(res);
            let buttonLike = <button className="button is-danger" style={{width:"100%"}}
                                     onClick={this.likeIt}>
                <span> Like it! </span>
                <span class="icon is-small">
                                <i className="fa fa-heart" style={{marginLeft:"25px"}}></i>
                            </span>
            </button>;
            this.setState({
                likes:this.props.likes,
                approved:this.props.approved,
                button:buttonLike
            });

        }).catch(error =>{
            alert(error)
        })
    }

    render(){
        return (

            <div className="column is-one-third has-shadow" >
                <div className="card large">
                    <div className="card-image">
                        <figure className="image">
                            <img src={this.props.image} />
                        </figure>
                    </div>
                    <div className="card-content">
                        <label> {this.state.likes} Likes</label>
                        <div className="media" style={{display:"block"}}>
                            {this.state.button}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default CardDashboard