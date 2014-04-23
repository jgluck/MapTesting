var map;
var mapObjs = [];
var officers = [];
var timeArray = [];
var callers = [];
var directionService; 
var toSave;
var numDirectionsGot = 0;


function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(-34.397, 150.644),
    zoom: 8
  };
  
  directionsService = new google.maps.DirectionsService();
  
  //begin my marker placement
  var myLatlng = new google.maps.LatLng(39.080368,-76.933116);
  mapOptions.center = myLatlng;
  
  map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
  this.map = map;
  
  
  //  google.maps.event.addListenerOnce(map, 'idle', function(){
  //    setTimeout( function (m) {
  //      m.setZoom(20);
  //      }, 5000, map );
  //    
  //  });
  
  test();
  
}

google.maps.event.addDomListener(window, 'load', initialize);

function MapThing(lat,long,name){
  this.lat = lat;
  this.long = long;
  this.latlng =  new google.maps.LatLng(this.lat,this.long);
  this.name = name;
  
  
  this.marker = new google.maps.Marker({
    position:this.latlng,
    title: this.name
  });
  
  this.drawOnMap = function(){
    this.marker.setMap(map);
  }
    
    this.toString = function () {
      var retVal = "";
      retVal += "Map Thing: ";
      retVal += name;
      retVal += " at: ";
      retVal += lat + ","+long
        return retVal;
      
    }
      
      this.undraw = function () {
        this.marker.setMap(null);
      }
        
        
        return this;
  
}


function Officer(lat,long,name,diameter){
  
  function createOfficer(){
    this.inheritFrom = MapThing;
    this.parent = this.inheritFrom(lat, long, name);
    this.prototype = MapThing(lat, long, name);
    
    this.reach = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.15,
      map: map,
      center: this.latlng,
      radius: diameter
    });
    
    this.marker.setIcon('img/bluepin.png');
      this.distanceToCaller = "Not Set";
     
     this.compare = function(a,b) {
      //console.log("Comparing: " + a + " to: " + b)
      //if(!a)
      //  return -1;
      //if(!b)
      //  return 1;
      if (a.distanceToCaller < b.distanceToCaller)
         return -1;
      if (a.distanceToCaller > b.distanceToCaller)
         return 1;
      return 0;
      }

  }
  
  createOfficer.prototype = MapThing;
  
  
  
  return new createOfficer();
  
}


function Caller(lat,long,name){
  
  function createCaller(){
    this.inheritFrom = MapThing;
    this.parent = this.inheritFrom(lat, long, name);
    this.prototype = MapThing(lat, long, name);
    
    return this;
  }
  
  createCaller.prototype = MapThing;
  
  var theCaller = new createCaller();
  theCaller.marker.setIcon('img/redpin.png')
    
    
    return theCaller;
  
}

function checkDistance(i){
  
  if(!i){
    return;
  }
  
  var request = {
    origin:i.marker.getPosition(),
    destination:mapObjs[3].marker.getPosition(),
    travelMode:google.maps.TravelMode.DRIVING
  };
  
  
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      i.distanceToCaller = response.routes[0].legs[0].duration.value
      numDirectionsGot++;
      
      if(numDirectionsGot == officers.length){
        officers.sort(officers[0].compare);
        officers[0].marker.setIcon('img/bluepin1.png');
        officers[1].marker.setIcon('img/bluepin2.png');
        officers[2].marker.setIcon('img/bluepin3.png');
      }
     }
  });
}



function test(){  
  
  
  mapObjs.push(new Officer(39.080368,-76.933116, "Car 78321", 2000));
  officers.push(mapObjs[0]);
  
  mapObjs.push(new Officer(39.080002,-76.955194,"Car 71382",1500));
  officers.push(mapObjs[1]);
  
  mapObjs.push(new Officer(39.064743,-76.948671,"Car 3", 700));
  officers.push(mapObjs[2]);
  
  
  mapObjs.push(new Caller(39.072506,-76.949272,"Peter Griffen"));
  
  
  
  
  mapObjs.forEach(function(entry){
    entry.drawOnMap();
  });
  
  officers.forEach(function(entry){
    console.log(entry);
    checkDistance(entry);
  });
  
  
  
  
  //officers = officers.sort(officers[0].compare);

  
}




