import React, {Component} from 'react'
import CardDashboard from './components/CardDashboard'
import NoImages from './components/NoImages'
import Upload from "./components/Upload";
import Connection from "./connections/Connection";
import AuthenticationService from "./components/services/AuthenticationService";


class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalState: false,
            cards:[]
        };
        this.Auth = new AuthenticationService();
        this.uploadNewPhoto = this.uploadNewPhoto.bind(this);
    }
    componentDidMount(){
        Connection.get("/photos/" + this.Auth.getIdUser()).then(res=>{
            // recive the photos
            let photos = JSON.parse(res.data.data);
            photos.sort(function(a,b) {return (a.likes> b.likes) ? -1 : ((b.likes > a.likes) ? 1 : 0);} );
            let cards = [];
            photos.forEach(function (photo) {
                cards.push(<CardDashboard image={photo.base64} likes={photo.likes} id={photo._id} approved={photo.approved}/>)
            });

            this.setState({
                cards: cards
            });
        }).catch(error =>{
            //not found any photos
        });
    }

    uploadNewPhoto(newPhoto){
        let cards = this.state.cards;
        if(!cards) cards = [];
        cards.push(<CardDashboard image={newPhoto.base64} likes={newPhoto.likes} id={newPhoto._id} approved={newPhoto.approved}/>)
        this.setState({
            cards:cards
        })
        alert("oOh that's a beautiful photo!");
    }

    render() {
        console.log(this.state);
        if(this.state.cards.length == 0){
            //show an message to upload new photos.
            return (
                <div>
                    <Upload uploadNewPhoto={this.uploadNewPhoto}/>
                    <NoImages />
                </div>
            );
        }

        return(
            <section class="container" style={{ marginBottom:"20px"}}>
                <Upload  uploadNewPhoto = {this.uploadNewPhoto} />
                <div class="row columns is-multiline">
                    {this.state.cards}
                </div>
            </section>
        );

    }

}

export default Home;