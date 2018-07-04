import React, {Component} from 'react'
import CardDashboard from './components/CardDashboard'
import NoImages from './components/NoImages'


class Home extends Component {

    render() {
        //TODO change that code to get de server response
        let cards = [];
        for(let i=0; i<6; i++){
            cards.push(<CardDashboard
                likes={i}
                image="https://images.unsplash.com/photo-1475778057357-d35f37fa89dd?dpr=1&auto=compress,format&fit=crop&w=1920&h=&q=80&cs=tinysrgb&crop=" />);
        }

        console.log(cards);
        if(cards.length == 0){
            //show an message to upload new photos.
            return (
                <NoImages />
            );
        }
        return(
            <section class="container" style={{ marginBottom:"20px"}}>
                <div class="row columns is-multiline">
                    {cards}
                </div>
            </section>
        );

    }

}

export default Home;