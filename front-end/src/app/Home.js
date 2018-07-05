import React, {Component} from 'react'
import CardDashboard from './components/CardDashboard'
import NoImages from './components/NoImages'
import Upload from "./components/Upload";


class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalState: false
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState((prev, props) => {
            const newState = !prev.modalState;

            return { modalState: newState };
        });
        console.log(this.state)
    }

    render() {
        //TODO change that code to get de server response
        let cards = [];
        if(cards.length == 0){
            //show an message to upload new photos.
            return (
                <div>
                    <Upload modalState={this.state.modalState} />
                    <a className="button is-primary" onClick={this.toggleModal}>
                        Open Modal
                    </a>
                    <NoImages />
                </div>
            );
        }

        return(
            <section class="container" style={{ marginBottom:"20px"}}>
                <Upload modalState={this.state.modalState} />
                <div class="row columns is-multiline">
                    {cards}
                </div>
            </section>
        );

    }

}

export default Home;