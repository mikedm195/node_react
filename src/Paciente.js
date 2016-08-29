var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var Tabaquismo = require('./Tabaquismo');
var Alcoholismo = require('./Alcoholismo');

var Paciente = React.createClass({
    render: function(){
        return(
            <div>
              <h1>Antecedentes personales patologicos</h1>
              <Adicciones/>              
            </div>              
        );
    }
});

var Adicciones = React.createClass({
    getInitialState: function() {
        return {
            data: []       
        };
    },
    componentDidMount: function() {
        $.ajax({
            url: '/pacientes',
            dataType: 'json',
            cache: false,
            success: function(datos) {
                //console.log(datos);        
                this.setState({data: datos[0]});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('/pacientes', status, err.toString());
            }.bind(this)
        });
        //console.log(this.state.data);    
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },
    render: function(){        
        return(
            <div>
                <Tabaquismo data={data.tabaquismo} datos={this.state.data.tabaquismo}/>
                <Alcoholismo data={data.alcoholismo}/>
            </div>
        );
    }
});

var data = {    
    tabaquismo:{
        cigarros: 10        
    },
    alcoholismo:{
        frecuencia: 'Fines_de_Semana',
        copasPorOcasion: 3,
        embriaguez: true
    }   
}

module.exports = Paciente;