import React , {Component} from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import $ from 'jquery';
import Table from 'react-bootstrap/Table'

class Planets extends Component{
    state={
        planets : [],
        planetName : [],
        selected:false,
        selectedPlanet:{}
    }
    componentDidMount(){
        $.ajax({
            type: 'get',
            url: 'https://swapi.co/api/planets/',
            crossDomain: true,
            success: function (data, status) {
                var noOfPages=Math.floor(data.count/10);
                var planets = [...this.state.planets,...(data.results)];
                //getting the planet name
                var planetNamesArray = data.results.map((planet)=>{
                    return planet.name;
                });
                var planetName = [...this.state.planetName,...planetNamesArray];
                    this.setState({
                        planets : planets,
                        planetName : planetName
                    });
                this.nextPlanetsData(data.next,noOfPages);
            }.bind(this),
            error: function (error, status) {
                console.log("ERROR", error, status);
            }
        });
    }
    nextPlanetsData(url,noOfPages){
        for(var i=0;i<noOfPages;i++){
            $.ajax({
                type: 'get',
                url: "https://swapi.co/api/planets/?page="+(i+2),
                crossDomain: true,
                success: function (data, status) {
                    var planets = [...this.state.planets,...(data.results)];
                    //getting the planet name
                    var planetNamesArray = data.results.map((planet)=>{
                        return planet.name;
                    });
                    var planetName = [...this.state.planetName,...planetNamesArray];
                        this.setState({
                            planets : planets,
                            planetName : planetName
                        });
                }.bind(this),
                error: function (error, status) {
                    console.log("ERROR", error, status);
                }
            });
        }
       
    }
    inputChange = (selected)=>{    
        var selectedPlanet=this.state.planets.find((value,index)=>{
            return value.name==selected[0]
        });
        this.setState({
            selected : true,
            selectedPlanet:selectedPlanet
        });

    }
    render() {
        var tableBody= null;
        var componentBody= (
            <Typeahead
                id="planets"
                style={{width: 'auto' , background:'yellow'}}
                labelKey="name"
                options={this.state.planetName?this.state.planetName : []}
                placeholder="Choose a planet..."
                onChange={this.inputChange}
            />
        );
        if(this.state.selected){
            tableBody=(
                    <tbody>
                        <tr>
                        <td>{this.state.selectedPlanet.name}</td>
                        <td>{this.state.selectedPlanet.gravity}</td>
                        <td>{this.state.selectedPlanet.population}</td>
                        <td>{this.state.selectedPlanet.diameter}</td>
                        <td>{this.state.selectedPlanet.climate}</td>
                        <td>{this.state.selectedPlanet.terrain}</td>
                        </tr>
                    </tbody>
                );
            componentBody = (
                <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Gravity</th>
                    <th>Population</th>
                    <th>Diameter</th>
                    <th>Climate</th>
                    <th>Terrain</th>
                    </tr>
                </thead>
                {tableBody}
            </Table>
            );
        }
        return ( 
        <div>
            <h1>Planet: {this.state.selectedPlanet?this.state.selectedPlanet.name:null} </h1>
            {componentBody}
        </div> );
    }
}

export default Planets;