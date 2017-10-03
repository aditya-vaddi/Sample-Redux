// {latitude:10,longitude:40},
// {latitude:10,longitude:20},
// {latitude:30,longitude:20},
// {latitude:30,longitude:40},
// {latitude:10,longitude:40}
import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  Alert,
  Modal,
  TextInput,
  Slider,
  Navigator,
  Image
} from 'react-native';
var toBeConvert = []
var converted = []
import turf from '@turf/turf'
/// Geolocation
exports.examples = [
  {
    title: 'navigator.geolocation',
    render: function(): React.Element<any> {
      return <AreaSelector/>;
    },
  }
];

///
const { width, height } = Dimensions.get('window');
var MapView = require('react-native-maps')
import RNViewShot from "react-native-view-shot";

// Shortened variables to hold type of Drawing

var FH = false  // Free Hand
var FL = false  // Free Liner
var PL = false  // Poly Line
var PG = false  // PolyGon
var DM = false  // Drop Marker
var CR = false  // Circle
var drawMode = false // will be assigned later assigned to this.props.drawMode
var editMode = false // will be assigned later assigned to this.props.editMode

/*
circleLayers and polygonLayers are the Layers(Shapes) imposed on the top of Map which are injected
 */
var circleLayers = []
var polygonLayers = []
var print = function(a,b,c,d,e,f){
 //   console.log('%c Map:','background: coral; color: white',
 //   checkUndefined(a),
 //   checkUndefined(b),
 //   checkUndefined(c),
 //   checkUndefined(d),
 //   checkUndefined(e),
 //   checkUndefined(f)
 // )
}
var checkUndefined = function(argument) {
    if( argument == undefined) {
      return ''
    }
    return argument
}

class AreaWithIn extends Component {

    constructor(props) {
    super(props);
    this.mapReference = {}
    this.newRegion = {}
    this.state =  {
         region:{
           latitude:0,
           longitude:0,
           latitudeDelta:180,
           longitudeDelta:180
         },
         polygonShape : {
           coordinates : []
         },
         circleShape : {
           coordinates : [],
           radius : 0
         },
         markers:[{coordinates:{latitude:35,longitude:35}}],
         imageSrc:"https://i.imgur.com/5EOyTDQ.jpg",
         randPoly: [
            {latitude:10,longitude:40},
            {latitude:10,longitude:20},
            {latitude:30,longitude:20},
            {latitude:30,longitude:40}
          ]
       }
  }

  // [-81, 41],
  // [-81, 47],
  // [-72, 47],
  // [-72, 41],
  // [-81, 41]

  componentWillMount() {
    //var randPolygon = turf.random('polygon')
//################

    // var polygon = turf.polygon([[
    //          [50, 50],
    //          [90, 90],
    //          [-2.215118, 53.489271],
    //          [-2.215118, 53.464547],
    //          [-2.275543, 53.464547]
    // ]])
    for(var key in this.state.randPoly) {
      toBeConvert.push([this.state.randPoly[key].latitude,this.state.randPoly[key].longitude])
    }
      converted = turf.polygon([toBeConvert])
//################
  }

  componentDidMount = () => {
    // As per use Case you can set the user Location as Map Mounts
    // this.userLocation()
  }

  snap = () => {
      if (this.props.drawMode) {
          RNViewShot.takeSnapshot(this.mapReference, {
          format: "png",
          quality: 0.8
        })
        .then((res) => {
        //  console.log('Image source Updated',res);
          this.setState({
            imageSrc:res
          })
        })
      }
  }

  getSnap = () =>{
    return this.state.imageSrc
  }


  userLocation = () =>{
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.mapReference.animateToRegion(
          {
            latitudeDelta : 0.0001,
            longitudeDelta : 0.0001,
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
          } , 500 )
      },
      (error) => alert(JSON.stringify(error)),
      // params Support only for Android
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  play = () => {
    print('Play Button Clicked')
    var region = {
     latitude: 44.883681,
     longitude:  -0.171728,
     latitudeDelta:0.01,
     longitudeDelta: 0.01,
    }
    this.mapReference.animateToRegion(region,500)
  }

  _handleNewPoint = (newPoint) => {
    //print('Click Detected on Map at Coordinates',newPoint)
      /*  EditMode does not allow to add newPoints as While Clicking on long Press to
        move marker will accidentally add another marker
       */
         //################################
         //
        //  {latitude:10,longitude:10},
        //  {latitude:20,longitude:20},
        //  {latitude:80,longitude:80},
        //  {latitude:90,longitude:90},
        //  {latitude:10,longitude:10}
        //
        //console.log('NewPoint',newPoint.latitude,newPoint.longitude);
        var pt = turf.point([newPoint.latitude,newPoint.longitude]);
        var poly = turf.polygon([[
          [10, 40],
          [10, 20],
          [30, 20],
          [30, 40],
          [10, 40]
        ]]);

var isInside = turf.inside(pt, poly);
// console.log('pt=>',pt);
// console.log('poly=>',poly);

  //console.log('isInside=>',isInside);







        //################################

        if(turf.inside(pt, poly)) {
              if(!this.props.editMode){
                if( CR ) {
                  // if the drawType is circle create the Circle and
                  var newCircle = {
                    coordinates : [newPoint],
                    radius : this.state.circleShape.radius
                  }
                  this.setState({
                    circleShape: newCircle
                  })

                } else if( FH || PL || PG || FL ){
                    this.setState({
                      polygonShape: {
                        coordinates : [...this.state.polygonShape.coordinates,newPoint]
                      }
                    })
                  } else {
                    this.setState({
                      markers : [...this.state.markers,{coordinates:newPoint}]
                    })
                  }
              }
    }
 }

join = () => {
   if(!CR && this.state.polygonShape.coordinates.length > 2){
      if(this.state.polygonShape.coordinates[0].latitude != this.state.polygonShape.coordinates[this.state.polygonShape.coordinates.length - 1].latitude){
        var appendStartPointToEnd = this.state.polygonShape.coordinates.concat(this.state.polygonShape.coordinates[0])
            var joinedPolygon = {
              coordinates: appendStartPointToEnd
            }
           this.setState({
              polygonShape: joinedPolygon
           })
        print('Joining First and Last Coordinates to form Closed Area');
      }else {
        print('Already Joined')
      }
   }else{
     Alert.alert('Join','Add 3 or more points to join')
   }
 }

data = () =>  {
  if(this.props.drawMode) {
    if( CR ) {
      return {
        id : Date.now(),  // Asigning a Unique Id to prevent duplicate data
        type : 'circle',
        data : this.state.circleShape
      }
    } else if( PL || PG || FL || FH ){
      return {
        id : Date.now(),
        type : 'polygon',
        data :this.state.polygonShape
      }
    } else {
      return {
        id : Date.now(),
        type : 'markers',
        data :this.state.markers
      }
    }
  }
  return null
}

  _updateDrawType = (newProps) =>{
        FH = (newProps.drawType == 'freeHand')
        FL = (newProps.drawType == 'freeLiner')
        PL = (newProps.drawType == 'polyline')
        PG = (newProps.drawType == 'polygon')
        DM = (newProps.drawType == 'dropMarker')
        CR = (newProps.drawType == 'circle')
        drawMode = this.props.drawMode
        editMode = this.props.editMode
  }

  log(){
    // console.log('Free Hand',FH);
    // console.log('Free Liner',FL);
    // console.log('Poly Line',PL);
    // console.log('Poly Gon',PG);
    // console.log('Drop Marker',DM);
  }

componentWillReceiveProps = (newProps) => {
  print('Receive new Props',newProps.shapes)
  this._updateDrawType(newProps)
}

_editableMarkersLayer = () => {
  if(this.props.editMode){
      if( PL || PG ) {
        return(
          this.state.polygonShape.coordinates.map( (eachMarker,i) => {
            return(
                <MapView.Marker
                  key = { i }
                  coordinate = { eachMarker }
                  onDragEnd = {(e) => {
                      this._handleMarkerMove(
                        e.nativeEvent.coordinate,
                        eachMarker.latitude,
                        eachMarker.longitude
                      )}}
                  draggable
                />
            );
          })
        )
      }
  }
  return null
}

_elementsLayer = () => {
  //console.log('Draw Type', this.props.drawType);
  if(this.props.drawMode){
      print('Drawing Type Detected As:',this.props.drawType)
      switch (this.props.drawType) {
        case 'polyline':
        case 'freeHand':
        case 'freeLiner':
            return (
                <MapView.Polyline
                //key={polyline.id}
                geodesic ={false}
                showsUserLocation={true}
                coordinates={this.state.polygonShape.coordinates}
                strokeColor="#1fca23"
                strokeWidth={5}/>
            )
          break;
        case 'polygon':
            if(this.state.polygonShape.coordinates.length > 2 ){
                return (
                    <MapView.Polygon
                    coordinates={this.state.polygonShape.coordinates}
                    fillColor ='rgba(24,158,27,0.5)'
                    strokeColor="#1fca23"
                    strokeWidth={6}
                    />
                  )
            } else {
                return (
                    <MapView.Polyline
                    //key={polyline.id}
                    geodesic ={false}
                    coordinates={this.state.polygonShape.coordinates}
                    strokeColor="#1fca23"
                    strokeWidth={5}/>
                  )
            }
            return null
          break;
        case 'circle':
            if(this.state.circleShape.coordinates.length != 0){
              return (
                  <MapView.Circle
                    center={{
                        latitude:this.state.circleShape.coordinates[0].latitude,
                        longitude:this.state.circleShape.coordinates[0].longitude
                    }}
                    radius = {this.state.circleShape.radius}
                    fillColor = 'transparent'
                    strokeColor = "#1fca23"
                    strokeWidth = {6}
                    />
              )
            } else {
              return null
            }
          break;
        case'dropMarker':
          return (
            this.state.markers.map((eachMarker,i) => {
              return(
                <MapView.Marker
                  key = { i }
                  coordinate = {eachMarker.coordinates}
                  />
              )
            })
          )
          break
        default:
          return null
      }
  }

  return null
}

reset = () => {
    this.setState({
        polygonShape: {
            coordinates:[]
        },
        circleShape : {
          coordinates : [],
          radius : 0
        },
        markers : []
    })
}

undo = () => {
   if(this.state.polygonShape.coordinates.length != 0){
     var undoPolygonShape = {
            coordinates: this.state.polygonShape.coordinates.slice(0,-1)
          }
        this.setState({
          polygonShape:undoPolygonShape
        })
   }
}

_handleMarkerMove = (Cord,initialLat,initialLng) => {

    var polylineData = this.state.polygonShape.coordinates
    var modifiedData = []

    for(var key in polylineData){
      if(polylineData[key].latitude == initialLat && polylineData[key].longitude == initialLng){
          modifiedData[key] = Cord
      }else {
          modifiedData[key] = polylineData[key]
      }
    }
    this.setState({
        polygonShape : {
          coordinates : modifiedData
        }
    })
}

  done = () => {
      this.setState({
         polygonShape : {
           coordinates : []
         },
         circleShape : {
           coordinates : [],
           radius : 0
         },
         markers : []
       })
   }

   goto = (region) => {
     // Pass the Region to animate to the region
     /*
     Example Region object
     {
       latitudeDelta : 0.0001,
       longitudeDelta : 0.0001,
       latitude : 50,
       longitude : 50
     }
     */
     this.mapReference.animateToRegion( region , 500 )

   }

   dropPins = (Image) => {

      //@TODO This Method drop the pins on the Map

   }

   setRadius = (r) => {
     //console.log('Income Radius Value', r);
     this.setState({
       circleShape: {
         coordinates : this.state.circleShape.coordinates,
         radius : r
       }
     })
   }

  render(){
    var props = {
      provider : 'google'
    }
    if(!this.props.googleMaps){
      props = { }
    }
    return (
        <View style={{flex:1}}>
            <MapView
               loadingEnabled ={false}
              {...props}
               style={{flex:1}}
               mapType = 'satellite'
               onPanDrag ={(e)=>{(this.props.drawMode && (FL || FH ))
                                  ? this._handleNewPoint(e.nativeEvent.coordinate)
                                  : null
                                 }}
               zoomEnabled  = {!this.props.drawMode}
               scrollEnabled = {!this.props.drawMode}
               initialRegion = {this.state.region}
               ref = {(MapRef) => {if(MapRef != null){ this.mapReference = MapRef }}}
               loadingEnabled = {true}
               onRegionChangeComplete = {(movedTo) => { this.newRegion = movedTo }}
               animateToRegion = {this._animateToRegion}
               onPress = {(e)=>{(
                  this.props.drawMode &&
                   ( PL || PG || FL || CR || DM ))
                 ? this._handleNewPoint(e.nativeEvent.coordinate)
                 : null
               }}>
                  {
                    this.props.shapes.circles.map((eachCircle,i) => {
                      return (
                        <MapView.Circle
                        key = {i}
                        center = {eachCircle.coordinates[0]}
                        radius = {eachCircle.radius}
                        fillColor = {eachCircle.fillColor}
                        strokeColor = 'black'
                        strokeWidth = {1}/>
                      )
                    })
                  }
                  {
                    this.props.shapes.polygons.map((eachPolygon,i) => {
                      return (
                        <MapView.Polygon
                          key = {i}
                          onPress ={(e)=>{}}
                          coordinates = {eachPolygon.coordinates}
                          fillColor = {eachPolygon.fillColor}
                          strokeColor = {eachPolygon.fillColor}
                          strokeWidth = {3}/>
                      )
                    })
                  }
                  {
                    this.props.markers.map((eachMarker,i) => {
                      return (
                        <MapView.Marker
                          key = {i}
                          coordinate = {eachMarker.coordinates}
                          //image = {eachMarker.image}
                          />
                      )
                    })
                  }
                  <MapView.Polygon
                  coordinates={this.state.randPoly}
                  fillColor ='rgba(24,158,27,0.5)'
                  strokeColor="#1fca23"
                  strokeWidth={6}
                  />
                  {this._elementsLayer()}
                  {this._editableMarkersLayer()}
            </MapView>
        </View>
    );
  }
}

AreaWithIn.propTypes = {
    shapes   : React.PropTypes.object,
    editMode : React.PropTypes.bool,
    drawMode : React.PropTypes.bool,
    drawType : React.PropTypes.string
 },

 AreaWithIn.defaultProps = {
    shapes : {circles:[],polygons:[]},
    editMode : false,
    drawMode : true,
    drawType : 'freeHand'
}

module.exports = AreaWithIn
