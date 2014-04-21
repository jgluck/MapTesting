var map;
var mapObjs = [];
  
function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(-34.397, 150.644),
          zoom: 8
        };
        
            
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
        fillOpacity: 0.35,
        map: map,
        center: this.latlng,
        radius: diameter
     });
   
     return this;
   }
   
  createOfficer.prototype = MapThing;

  return new createOfficer();

 }


function test(){

  
  mapObjs.push(new Officer(39.080368,-76.933116, "Car 78321", 2000));
  
  mapObjs.forEach(function(entry){
        entry.drawOnMap();
    });
  
//  for (var mapThing in mapObjs) {
//    console.log("hi");
//    console.log(typeof mapThing);
//    mapThing.drawOnMap();
//  }
}
  



