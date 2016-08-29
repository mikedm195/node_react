var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Redirect = require('react-router').Redirect;
//var hashHistory = require('history')

var Paciente = require('./Paciente');

var NoMatch = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Error 404</h1>
                <h2>Not Found</h2>
            </div>
        );
    }
});

ReactDOM.render(
    (
        <Paciente/>
        //<Router>
        //    <Route path="/pacientes" component={Paciente} />
        //    <Redirect from="/" to="/pacientes" />
        //    <Route path="*" component={NoMatch} />
        //</Router>
    ),
    document.getElementById('main')
);
