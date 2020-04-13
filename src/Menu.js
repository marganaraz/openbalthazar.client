import React, {Component} from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import './Menu.css';
import 'codemirror/mode/clike/clike';
import AppTopBar from './bars/AppTopBar';
import AppLeftBar from './bars/AppLeftBar';
import { loadFile } from './services/FileService';
import { scan } from './services/ScannerService';
import Grid from '@material-ui/core/Grid';
import { withSnackbar } from 'notistack';
import { Alert, AlertTitle }  from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            code: '',
            resultado: [],
            currentFile: '',
            editor: null,
            disabled: false
          };
    }

    componentDidMount () {
        
        var user = JSON.parse(localStorage.getItem("user"));
        if(user.lastFile !== '') {
            loadFile(user.lastFile)
                .then(response => {
                    this.setState({
                        currentFile: user.lastFile
                    });
                })
        }
    }
    
    handleClickVariant = (message, variant) => {
        // variant could be success, error, warning, info, or default
        this.props.enqueueSnackbar(message, { variant });
    };

    loadFile = (path) => {
        // Llamo a la API para obtener los archivos
        loadFile(path)
        .then(response => {  
            this.setState({  
                code: response.data,
                currentFile: path,
                disabled: false,
                resultado: []
            });  
            // Deberia guardar el ultimo editado
            var user = JSON.parse(localStorage.getItem("user"));

            user.lastFile = path;

            localStorage.setItem("user", JSON.stringify(user));
        })
        .catch(err => {
            console.log(err); 
        })
    }

    resetUI = () => {
        this.setState({
            currentFile: '',
            code: '',
            disabled: true,
        });
    }

    analyze = () => {
        scan(this.state.currentFile, this.state.code)
        .then(response => {  
            this.setState({  
                resultado: response.data  
            });  
            console.log(response.data);
            var count = Object.keys(response.data).length;
            if(count === 0) this.handleClickVariant('No bugs founds','success');
            else this.handleClickVariant('Bugs founds, please see Details bar','error');
        })
        .catch(err => {
            console.log(err); 
        })
    }

    getFileName = (str) => {
        if(str == null) return 'undefined.sol';
        return str.split('\\').pop().split('/').pop();
    };

    mark(lineNro) {
        
        if(this.state.editor) {
            // Resto una unidad
            lineNro--;

            // Marco el texto
            this.state.editor.markText({line: lineNro, ch: 0}, {line: lineNro, ch: 42}, { css: "background : #ff7"});
            
            // Posiciono el cursor en el medio de la pantalla
            var t = this.state.editor.charCoords({line: lineNro, ch: 0}, "local").top; 
            var middleHeight = this.state.editor.getScrollerElement().offsetHeight / 2; 
            this.state.editor.scrollTo(null, t - middleHeight - 5); 
        }
    }

    render(){
        const { code, resultado, currentFile, disabled } = this.state;
        var bugsTree = resultado.map(
            function iterator( e ) {
                return(
                    <div style={{paddingTop: '4px'}}>
                <Alert severity={e.severity}
                    action={
                        <Button color="inherit" size="small" onClick={() => { this.mark(e.lineNumber) }}>
                          VIEW
                        </Button>
                      }
                      >
                    <AlertTitle>{e.ruleName}</AlertTitle>
                    {e.ruleError}
                </Alert>
                </div>
                );
            },
            this
        );

        return(
             <div style={{flexGrow: 1, height: "100vh"}}>
                 <Grid container>
                     <Grid item  xs={12} >
                         <div style={{height: "12vh"}}>
                             <AppTopBar />
                         </div>
                     </Grid>
                     <Grid  item  xs={2}>
                         <div className="panel">
                         <AppLeftBar 
                           loadFile={this.loadFile}
                           resetUI={this.resetUI}
                           currentFile={currentFile}
                         ></AppLeftBar>
                         </div>
                     </Grid>
                     <Grid item  xs={7}>
                          <div style={{width: '98%', margin:'0px', padding:'0px'}}>
                         <Tabs style={{padding: '3px', margin: '0px', height: '35px', minHeight: '35px'}}
                            value={0}
                            indicatorColor="primary"
                            textColor="primary"                            
                            >
                            <Tab style={{padding: '4px', margin: '0px', height: '35px', minHeight: '35px'}} label={this.getFileName(currentFile)} />
                         </Tabs>
                         <div> 
                         <CodeMirror
                            editorDidMount={editor => { this.setState({ editor: editor });}}
                            value={code}
                            options={{
                            autoRefresh: true,
                            mode: 'text/x-csharp',
                            theme: 'default fullheight',
                            lineNumbers: true,
                            viewportMargin: Infinity,
                            readOnly: disabled
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
                         
                     </Grid>
                     <Grid item xs={3}>
                         <div className="panel">
                            <div>
                                <Button fullWidth onClick={this.analyze} variant="outlined" color="primary">check it!</Button>
                            </div>
                            <div>
                                {bugsTree}
                            </div>
                         </div>
                     </Grid>
                 </Grid>
             </div>
        )
    }
}

export default withSnackbar(Menu);