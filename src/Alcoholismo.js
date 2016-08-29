var React = require('react');
var ReactDOM = require('react-dom');

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
        this.setState({embriaguez: checked}, function () {
            console.log(this.state.embriaguez);
        });
        this.calculaTipo();
    },
    radioChange: function(event){
        this.setState({ frecuencia: event.target.value }, function () {
            console.log(this.state.frecuencia);
        });        
        this.calculaTipo();
    },
    copasChange: function(event){
        this.setState({ copasPorOcasion: event.target.value }, function () {
            console.log(this.state.copasPorOcasion);
        });
        this.calculaTipo();
    },
    calculaTipo: function(){
        var frecuencia = this.state.frecuencia;        
        var copasPorOcasion = this.state.copasPorOcasion;
        var embriaguez = this.state.embriaguez;
        var tipo = '';
        if(frecuencia == 'Nunca'){
            tipo = 'Abstemio';
            
        }else{
            if((frecuencia == 'Fines_de_Semana' || frecuencia == 'Ocasionalmente') 
            && copasPorOcasion < 4 && !embriaguez){
                tipo = 'Bebedor Social';                
            }else{
                if(frecuencia != 'Nunca' && copasPorOcasion >= 4 && embriaguez){
                    tipo = 'Bebedor de riesgo';                    
                }else{
                    tipo = 'Interrogado y negado';                    
                }
            }
        }
        this.setState({ tipo: tipo }, function () {
            console.log(this.state.tipo);
        });
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

module.exports = Alcoholismo;