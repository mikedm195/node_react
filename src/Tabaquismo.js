var React = require('react');
var ReactDOM = require('react-dom');

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
        console.log(this.props.data);          
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

module.exports = Tabaquismo;