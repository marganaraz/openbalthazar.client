import React, {Component} from 'react';
import { GoogleLogout } from 'react-google-login';
import { Config } from './Config';
import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/clike/clike';

const clientId = Config.GoogleAPIKey;

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usuario: '',
            code: '',
          };
    }

    componentDidMount() {
        var user = JSON.parse(localStorage.getItem("user"));
        this.setState({usuario: user.name});
    }

    logout = () => {
        // Reidcciono al Home
        localStorage.setItem("user", null);
        this.props.history.push('/');
    }

    render(){
        const { usuario, code } = this.state;
        return(
            <div>
                <div>
                    <h1>{usuario}</h1>
                </div>
                <div>
                    <GoogleLogout buttonText="Logout" clientId={clientId} onLogoutSuccess={this.logout} />
                </div>
                <div>
                <CodeMirror
                    value={code}
                    options={{
                        mode: 'text/x-csharp',
                        theme: 'default',
                        lineNumbers: true
                      }}
                    onBeforeChange={(editor, data, value) => {
                        this.setState({code: value});
                    }}
                     onChange={(editor, data, value) => {
                        this.setState({code: value});
                     }}
/>
                </div>
                
            </div>
        )
    }
}

export default Menu;