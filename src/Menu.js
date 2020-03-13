import React, {Component} from 'react';
import { GoogleLogout } from 'react-google-login';
import { Config } from './Config';

const clientId = Config.GoogleAPIKey;

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usuario: '',
          };
    }

    componentDidMount() {
        var user = JSON.parse(localStorage.getItem("user"));
        this.setState({usuario: user.name});
    }

    logout = () => {
        // Reidcciono al Home
        this.props.history.push('/');
    }

    render(){
        const { usuario } = this.state;
        return(
            <div>
                <div>
                    <h1>{usuario}</h1>
                </div>
                <div>
                    <GoogleLogout buttonText="Logout" clientId={clientId} onLogoutSuccess={this.logout} />
                </div>
            </div>
        )
    }
}

export default Menu;