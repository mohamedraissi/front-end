import {GoogleMapsAPIWrapper} from '@agm/core/services/google-maps-api-wrapper';
import { Directive,  HostListener } from '@angular/core';
declare var google: any;



@Directive({
  selector: '[clear-map]'
})
export class ClearMapDirective {
    constructor (private gmapsApi: GoogleMapsAPIWrapper) {}
  ngOnInit(){
      
  }
}
/*this.gmapsApi.getNativeMap().then(map => {
              console.log(this.waypoints);
              var directionsService = new google.maps.DirectionsService;
              var directionsDisplay = new google.maps.DirectionsRenderer;
              directionsDisplay.setMap(map);
              directionsService.route({
                      origin:{lat:36.9482754 , lng:8.742610099999979 }, 
                      destination: {lat: 36.8625853, lng: 10.332949399999961},
                      waypoints:this.waypoints,
                      optimizeWaypoints: true,
                      travelMode: 'DRIVING'
                    }, function(response, status) {
                      //console.log(response.routes[0].legs[1]);
                                if (status === 'OK') {
                                 let options={zoom:7};
                                  directionsDisplay.setOptions(options);
                                  directionsDisplay.setDirections(response);

                                  
                                } else {
                                  window.alert('Directions request failed due to ' + status);
                                }
              });
              this.waypoints=[]
    });*/