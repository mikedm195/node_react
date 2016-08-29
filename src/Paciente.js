var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

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
            success: function(data) {
                //console.log(data);        
                this.setState({data: data[0]});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('/pacientes', status, err.toString());
            }.bind(this)
        });
        console.log(this.state.data);    
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },
    render: function(){        
        return(
            <div>
                <Tabaquismo data={data.tabaquismo}/>
                <Alcoholismo data={data.alcoholismo}/>
            </div>
        );
    }
});

var Tabaquismo = React.createClass({
    getInitialState: function() {        
        return {
            cigarros: this.props.data.cigarros,
            indice: (this.props.data.cigarros*2)
        };
    },
    calculaTabaquismo: function(event) {                                     
        this.setState({
            cigarros: event.target.value,
            indice: event.target.value * 2
        });                
    },    
    render: function(){        
        return(
            <div>
                <h2>Tabaquismo</h2>
                <form name="tabaquismo">
                    <p>Cigarros al dia:</p>
                    <input type="number" value={this.state.cigarros} placeholder="# de cigarros" onChange={this.calculaTabaquismo}/>
                    <p>Indice de tabaquismo</p>
                    <input type="text" value={this.state.indice}  placeholder="indice de cigarros" disabled/>
                </form>
            </div>
        );
    }   
});

var Alcoholismo = React.createClass({
    getInitialState: function() {
        return {
            frecuencia: this.props.data.frecuencia,
            copasPorOcasion: this.props.data.copasPorOcasion,
            embriaguez: this.props.data.embriaguez || false,
            tipo: 'Abstemio'
        };
    },
    chBoxChange: function(event){
        var checked = event.target.value;
        console.log(checked);
        if(checked == 'on')
            checked = 'off';            
        else
            checked = 'on';
        checked = !checked;
        //console.log(checked);
        this.setState({embriaguez: checked});
        this.calculaTipo();
    },
    radioChange: function(event){
        this.setState({ frecuencia: event.target.value });        
        this.calculaTipo();
    },
    copasChange: function(event){
        this.setState({ copasPorOcasion: event.target.value });
        this.calculaTipo();
    },
    calculaTipo: function(){
        var frecuencia = this.state.frecuencia;        
        var copasPorOcasion = this.state.copasPorOcasion;
        var embriaguez = this.state.embriaguez;
        if(frecuencia == 'Nunca'){
            this.setState({ tipo: 'Abstemio' });
        }else{
            if((frecuencia == 'Fines_de_Semana' || frecuencia == 'Ocasionalmente') 
            && copasPorOcasion < 4 && !embriaguez){
                this.setState({ tipo: 'Bebedor Social' });
            }else{
                if(frecuencia != 'Nunca' && copasPorOcasion >= 4 && embriaguez){
                    this.setState({ tipo: 'Bebedor de riesgo' });
                }else{
                    this.setState({ tipo: 'Interrogado y negado' });
                }
            }
        }
    },
    render: function(){        
        return(
            <div>
                <h2>Alcoholismo</h2>
                <form name="alcoholismo">
                    <p>Frecuencia con la que ingiere bebidas alcohólicas:</p>
                    <input type="radio" name="gender" onChange={this.radioChange} checked={'Ocasionalmente' === this.state.frecuencia}  value="Ocasionalmente"/> Ocasionalmente <br/>
                    <input type="radio" name="gender" onChange={this.radioChange} checked={'Fines_de_Semana' === this.state.frecuencia}  value="Fines_de_Semana"/> Fines de Semana<br/>
                    <input type="radio" name="gender" onChange={this.radioChange} checked={'Diario' === this.state.frecuencia}  value="Diario"/>Diario<br/>
                    <input type="radio" name="gender" onChange={this.radioChange} checked={'Nunca' === this.state.frecuencia}  value="Nunca"/>Nunca<br/><br/>

                    ¿En promedio cuantas copas se toma por ocasión?<br/>
                    <input type="text" value={this.state.copasPorOcasion} onChange={this.copasChange} placeholder="indice de cigarros"/><br/><br/>

                    <input type="checkbox" checked={this.state.embriaguez} onChange={this.chBoxChange}/> Llega ocasionalmente a la embriaguez<br/>
                    Tipo: 
                    <input type="text" value={this.state.tipo}   disabled/><br/>

                </form>
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