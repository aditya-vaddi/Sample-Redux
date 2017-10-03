/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
/*eslint-disable*/
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  TouchableHighlight,
  ScrollView,
  Slider,
  Alert,
  Image
} from 'react-native';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const randp = require('./Shapes/Polygon')
const randClr = require('./Utilities/RandomColor')

const buttonColor = '#F44336'
const bgcolor = '#00000000'
var MapView = require('react-native-maps')
var PointsList = require('./PointsList')
var AreaSelector = require('./AreaSelector')
var Overlay = require('react-native-overlay');

const TopButton = ({title,onPress,enabled}) => (
        <TouchableHighlight onPress={onPress} style={{height:40,width:width/5,flex:1,alignItems:'center',justifyContent:'center',margin:5}} underlayColor= 'transparent'>
           <View style={{height:50,width:width/5,backgroundColor:(enabled?'lightgrey':buttonColor),alignItems:'center',justifyContent:'center',borderRadius:2,shadowOffset:{width: 2, height: 2},shadowColor:'black',shadowRadius:1,shadowOpacity:0.1}}>
               <Text style={{fontFamily:'AvenirNext-bold',color:'#ffffff'}}>{title}</Text>
           </View>
        </TouchableHighlight>
)

const ButtomButton = ({title,onPress,enabled,drawMode}) => (
        <TouchableHighlight onPress={onPress} style={{height:40,width:width/3.14,flex:1,alignItems:'center',justifyContent:'center',margin:5}} underlayColor= 'transparent'>
           <View style={{height:50,width:width/3.14,backgroundColor:(drawMode?(enabled?'#1565C0':'#2196F3'):'lightgrey'),alignItems:'center',justifyContent:'center',borderRadius:2}}>
               <Text style={{fontFamily:'AvenirNext-bold',color:'#ffffff'}}>{title}</Text>
           </View>
        </TouchableHighlight>
)

const Marker = require('./images/arrow.png')

class MapHome extends Component {
    constructor(props) {
    super(props);
    this.state = {
	    showData : false,
      drawMode : false,
      editMode : false,
      drawType :'freeHand',
      areas    : {
        circles : [],
        polygons : []
      },
      markers : [],
      radius : 0,
      enableGoogleMaps : false,
      drawWithInShape : []
    };
  }

  _handleDrawDone = () => {

    this.refs.Map.reset()
    var DataFromMap = this.refs.Map.data()
    /*
      AreaSelector gives back null as soon as it Mounted.
      this.refs.Map.data() is null until user draws on the Map on the drawMode true
    */
    console.log("_handleDrawDone type", DataFromMap);
    if( DataFromMap !== null ){ /* Check to see if the Data Returned from Map is Null*/
        var newShapes = this.state.areas
        var newMarkers = this.state.markers
        /* Define temp Shapes object to hold data from Map */
        console.log("draw type in draw done", DataFromMap.type);
        if( DataFromMap.type == 'circle' ){

            newShapes.circles.push({
              coordinates : DataFromMap.data.coordinates,
              radius : DataFromMap.data.radius,
              fillColor : randClr()
            })

        }else if( DataFromMap.type == 'polygon' ){
          newShapes.polygons.push({
            coordinates : DataFromMap.data.coordinates,
            fillColor : randClr(),
            onPress : this._onPolygonPress
            /*pass a function as onPress to enable polygon onPress Event, this._onPolygonPress is  suppose
              to be a variable , passing a function this._onPolygonPress() immediately triggers the function.
            */
          })

        }else if( DataFromMap.type == 'markers' ){

            this.setState({
              markers: newMarkers.concat(DataFromMap.data)
            })
        }

        this.setState({
            areas : newShapes
        })

    }


    //disable edit mode if user is drawing, as this will render a push pins slowing down the performance

    this.setState({
      drawMode:!this.state.drawMode,
      editMode:false,
    })

  }
  _onPolygonPress = (e) =>{
    console.log('OnClick Event',e);
  }

  _slider() {
    // only show slider is the draw type is circle
    if(this.state.drawType == 'circle' && this.state.drawMode){
        return (
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#90CAF9'}}>
            <Slider style={{height:50,width:width-120}}
              value = {(this.state.radius)/100}
              onValueChange={(value) => { this.setState( { radius:value*100 }, ()=>{this.refs.Map.setRadius(this.state.radius*100000)})}}
              onSlidingComplete = {() => {}}
            />
            <Text style={{width:120,color:'white',fontSize:15,textAlign:'center',fontWeight:'700'}}>
               {Math.floor(this.state.radius)} Miles
            </Text>
          </View>
        );
    }
    return  <View style={{height:60,width:width,backgroundColor:'lightgrey'}}/>
  }

  _modelContent = () => {
    var points = (this.refs.Map != undefined)?this.refs.Map.data():[]
    var ImageURL  = (this.refs.Map != undefined)?this.refs.Map.getSnap():''
    return(
      <PointsList points = {points}
        image = {ImageURL} />
    )
  }

  _toggleDrawWithInShape(){

      this.setState({
        drawWithInShape:  this.state.drawWithInShape.length
                          ? []
                          : randp
      })
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:bgcolor}}>
          <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showData}
          onRequestClose={() => {alert("Modal has been closed.")}}>
            <View style={{flex:1}}>
                <TouchableHighlight onPress= {()=>{this.setState({showData:false})}}>
                  <View style={{flex:1, height:50, backgroundColor:'#90CAF9',alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontFamily:'AvenirNext-bold',marginLeft:20}}>Close</Text>
                  </View>
                </TouchableHighlight>
                <View style={{height:height, width:width}}>

                        {/* We are trying to access a component's method even before it is rendered
                          the Map is rendered after the points in the render tree, and ref is only set after the component is Mounted
                          so, access the refs of unmounted components returns undefined. Access the methods only after the Map is completly rendered and
                          ref is set.*/}
                        {this._modelContent()}
                </View>
            </View>
          </Modal>
            <AreaSelector
              ref = 'Map'
              editMode = {this.state.editMode}
              drawMode = {this.state.drawMode}
              drawType = {this.state.drawType}
              shapes = {this.state.areas}
              markers = {this.state.markers}
              googleMaps = { this.state.enableGoogleMaps }
              drawWithInShape = {this.state.drawWithInShape}>
            </AreaSelector>
            <TouchableHighlight style= {[styles.locationStyle]} onPress = {()=>{this.refs.Map.userLocation()}}>
            <View>
                <Image source={require('./images/locationmarker.png')} style= {{height: 45, width: 45, left: 200}} title= 'Locate' enabled = {false}/>
            </View>
            </TouchableHighlight>
            <TouchableHighlight style= {[styles.buttonStyle]} onPress = {()=>{this.refs.Map.play(),this._handleDrawDone(),this.setState({drawType:'freeLiner'})}}>
              <View>
                <Image source={require('./images/play.png')} style= {[styles.buttonStyle]} enabled = {this.state.drawMode}/>
              </View>
            </TouchableHighlight>
            <TouchableHighlight style= {[styles.saveButton]} onPress = {()=>{console.log("save data",this.state.areas.polygons[0].coordinates);}}>
              <View>
                <Image source={require('./images/save.png')} style= {[styles.buttonStyle]}  enabled = {this.state.drawMode}/>
              </View>
            </TouchableHighlight>
            <TouchableHighlight style= {[styles.undoButton]} onPress={()=>{this.refs.Map.undo()}} >
              <View>
                <Image source={require('./images/undo.png')} style= {[styles.buttonStyle]}  enabled = {!this.state.drawMode}/>
              </View>
            </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  overlay: {
  flex: 1,
  position: 'absolute',
  left: 0,
  top: 0,
  opacity: 0.5,
  backgroundColor: 'black',
  width: width
},
actionContainer: {
  flex: 1,
  backgroundColor: 'black',
  width: width
},
buttonStyle:
  { position: 'absolute',
    bottom: 10,
    width: 50,
    height: 50 },
locationStyle:
 { position: 'absolute',
   top: 70,
   left: 100,
   width: 50,
   height: 50 },
topContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: '#cccccc',
    shadowColor: "#000000",
    shadowRadius: 10,
    shadowOpacity: 0.5,
    shadowOffset: {
      h: 0,
      w: 0
    },
},
saveButton: {
  position: 'absolute',
    bottom: 10,
    left: 300,
    width: 70,
    height: 30
},
undoButton: {
  position: 'absolute',
    bottom: 10,
    left: 100,
    width: 50,
    height: 50
}
});

module.exports = MapHome
