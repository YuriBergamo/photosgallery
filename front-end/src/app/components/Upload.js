import React, {Component} from 'react'
import AuthenticationService from "./services/AuthenticationService";
import Connection from "../connections/Connection";



class Upload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: {},
            class: ""
        };
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.Auth = new AuthenticationService();
    }

    handleSubmit(e) {
        e.preventDefault();
        let imageObject = {
            "user_id": this.Auth.getIdUser(),
            "base64": this.state.base64,
            "likes": 0,
            "approved": false
        };
        console.log(imageObject);
        this.setState({
            class : " is-loading"
        });
        Connection.post("/photos", imageObject).then(res =>{
            //new image
            console.log("New image", res);
            console.log(this.props);
            this.props.uploadNewPhoto(res);
            this.setState({
                class : " "
            })
        }).catch(error =>{
            this.setState({
                class : " "
            });
            alert(error);
        })
    }

    handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                base64: reader.result
            });
        };

        reader.readAsDataURL(file)
    }

    render() {
        return(

                <div className="file is-centered has-name">
                    <form onSubmit={this.handleSubmit} className="columns">
                        <div className="field column" style={{marginTop:"20px"}}>
                            <div className="file is-info has-name">
                                <label className="file-label">
                                    <input className="file-input" type="file" name="resume" onChange={this.handleImageChange} />
                                    <span className="file-cta">
                                        <span className="file-icon">
                                            <i className="fas fa-upload"></i>
                                        </span>
                                        <span className="file-label">
                                             Upload your favorites photos here!
                                        </span>
                                    </span>
                                    <span className="file-name">
                                        {this.state.file.name}
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className="column">
                            <button className={"button is-info" + this.state.class} type="submit" >Upload Image</button>
                        </div>
                    </form>
                </div>

        );

    }

}

export default Upload;