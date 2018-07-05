import React, {Component} from 'react'


class Upload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalState: this.props.modalState
        };
    }

    render() {
        if(!this.props.modalState) {
            return null;
        }
        return(
            <div className="modal is-active">
                <div className="modal-background"></div>
                    <div className="modal-content">
                        <div className="field">
                            <div className="file is-centered is-boxed is-danger has-name">
                                <label className="file-label">
                                    <input className="file-input" type="file" name="resume" />
                                     <span className="file-cta">
                                        <span className="file-icon">
                                          <i className="fas fa-upload"></i>
                                    </span>
                                    <span className="file-label">
                                          Choose your favorite photos!
                                    </span>
                                    </span>
                                        <span className="file-name">

                                        </span>
                                </label>
                            </div>
                        </div>
                    </div>
                <button class="modal-close is-large" aria-label="close"></button>
            </div>
        );

    }

}

export default Upload;