import React, {Component} from 'react';
import AppTopBar from './bars/AppTopBar';
import { scanAll } from './services/EtherscanService';
import Grid from '@material-ui/core/Grid';
import { withSnackbar } from 'notistack';
//import { Alert, AlertTitle }  from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chart from 'react-apexcharts'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import './Etherscan.css';

class Etherscan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filesWithErrors: [],
            files: 0,
            open: false,
            filesErrors: '',
            series: [0, 0],
            seriesBar: [{
              name: 'series-1',
              data: []
            }],
            optionsPie: {
              chart: {
                width: 380,
                type: 'pie',
              },
              labels: ['Sin Error', 'Con Error'],
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            },
            optionsBar: {
              chart: {
                id: 'apexchart-example'
              },
              xaxis: {
                categories: ['TxOriginRule', 'ReentrancyRule']
              }
            },
          };
    }
    
    componentDidMount() {
      const etherscan = JSON.parse(localStorage.getItem("etherscan"));

      if(etherscan) {
        console.log("levanto de disco")
        console.log(etherscan.rules);
        this.setState({  
          files: etherscan.files - etherscan.filesErrors,
          filesErrors: etherscan.filesErrors,
          filesWithErrors: etherscan.filesWithErrors,
          series: [etherscan.files, etherscan.filesErrors],
          seriesBar: [{
            name: 'series-1',
            data: [etherscan.rules.TxOriginRule, etherscan.rules.ReentrancyRule]
          }]
      }); 
      }
      
    }

    handleClickVariant = (message, variant) => {
        // variant could be success, error, warning, info, or default
        this.props.enqueueSnackbar(message, { variant });
    };

    analyze = () => {
        this.setState({ open: true}, () => {
          scanAll()
          .then(response => {  
              console.log(response.data);
              this.setState({  
                  files: response.data.files - response.data.filesErrors,
                  filesErrors: response.data.filesErrors,
                  filesWithErrors: response.data.filesWithErrors,
                  series: [response.data.files, response.data.filesErrors],
                  seriesBar: [{
                    name: 'series-1',
                    data: [response.data.rules.TxOriginRule, response.data.rules.ReentrancyRule]
                  }],
                  open: false
              });  

              localStorage.setItem("etherscan", JSON.stringify(response.data));
              
              var count = Object.keys(response.data).length;
              if(count === 0) this.handleClickVariant('No bugs founds','success');
              else this.handleClickVariant('Bugs founds, please see Details bar','error');
          })
          .catch(err => {
              console.log(err); 
          })
        });
    }

    render(){
        const { filesWithErrors, open, filesErrors } = this.state;
        var filesTree = filesWithErrors.map(
            function iterator( file ) {
    
                return(
                    <ListItem dense style={{padding:'0px', margin:'0px'}} key={file.filename}>
                      <ListItemText
                        primary={file.filename}
                        secondary={"Errors: " + file.errors + " Warnings: " + file.warnings}
                      />

                    </ListItem>
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
                     <Grid item  xs={12}>
                          <Button onClick={this.analyze} variant="outlined" color="primary">check it!</Button>
                     </Grid>
                     <Grid item  xs={6}>
                       <div style={{textAlign: 'center', padding: '10px'}}>
                      <Typography>Porcentaje de Smart Contracts con Vulnerabilidades</Typography>
                     <Chart options={this.state.optionsPie} series={this.state.series} type="pie" width={500} height={220} />
                     <Typography>Cantidad de vulnerabilidades por Reglas de Analisis</Typography>
                     <Chart options={this.state.optionsBar} series={this.state.seriesBar} type="bar" width={500} height={220} />
                     </div>
                     </Grid>
                     <Grid item  xs={6}>
                     <div>
                        <List dense={true}>
                        {filesTree}
                        </List>
                    </div>
                     </Grid>
                 </Grid>
                 <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className="modal"
                  open={open}
                  onClose={() => this.setState({open: false})}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={open}>
                    <div className="paper">
                      <h2 id="transition-modal-title">El proceso se encuentra en marcha!</h2>
                      <p id="transition-modal-description">Este proceso puede demorar varios minutos, por favor tenga paciencia!.</p>
                      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <CircularProgress />
                      </div>
                      
                    </div>
                  </Fade>
                </Modal>
             </div>
        )
    }
}

export default withSnackbar(Etherscan);