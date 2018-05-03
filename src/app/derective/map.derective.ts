import {GoogleMapsAPIWrapper} from '@agm/core/services/google-maps-api-wrapper';
import { Directive,  Input, HostListener, Output,EventEmitter} from '@angular/core';
declare var google: any;
declare var $: any;



@Directive({
  selector: 'agm-google-map-directions'
})
export class DirectionsMapDirective {
    
  @Input() origin;
  @Input() destination;
  @Input() waypoints;
  @Output() result = new EventEmitter();
  legs:object[]=[];
  public directions: any = {
    directionsService: null,
    directionsDisplay: null
  }
  constructor (private _gmapsApi: GoogleMapsAPIWrapper) {
    
  }
  ngOnInit() {
    this.initalizeMap(this.directions);  
  }

  initalizeMap(directions): void {
    this._gmapsApi.getNativeMap().then(map => {
      this.directions.directionsService = new google.maps.DirectionsService;
      this.directions.directionsDisplay = new google.maps.DirectionsRenderer;
      this.directions.directionsDisplay.setMap(map);
      this.directions.directionsDisplay.addListener('directions_changed', function() {
          this.displayRoute(this.origin, this.destination, directions.directionsService, directions.directionsDisplay);
          
      });
      this.displayRoute(this.origin, this.destination, directions.directionsService, directions.directionsDisplay);
      console.log(directions.directionsDisplay.getDirections())
      
     
    });
    
     
  }
  displayRoute(origin, destination, service, display) {
    var myWaypoints = [];
    for (var i = 0; i < this.waypoints.length; i++) {
      console.log(this.waypoints[i].location);
    }
  
    for (var i = 0; i < this.waypoints.length; i++) {
      myWaypoints.push({
        location: new google.maps.LatLng(this.waypoints[i].location),
        stopover: true
      })
    }
  
    service.route({
      origin: origin +', Tunisie',
      destination: destination,
      waypoints: myWaypoints,
      travelMode: 'DRIVING', 
      avoidTolls: true
    }, function(response, status) {
      console.log(status)
      if (status == 'OK') {
        console.log("Route OK.");
        var tab=response.routes[0].legs;
        for(var i=0; i < tab.length; i++ ){
          $('#total'+i).html(tab[i].distance.text+"<br>"+tab[i].duration.text) ;
          console.log(tab[i])
          console.log(response);
        }
        display.setDirections(response);
      }
      else {
        alert('Could not display directions due to: ' + status);
      }
      
      
    });
   }
   calculateRoute(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
    }
    total = total / 1000.0;
    document.getElementById('total').innerHTML = total + ' km';
    }
}