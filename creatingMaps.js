var GaugeTypes;
var GaugeTypeGlossFalse;

var basemap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });


var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var Esri_OceanBasemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
	maxZoom: 13
});

var map = L.map('map', {
    center: [45.64701, -17.39425],
    zoom: 4,
    layers: [basemap]
    
});

var getCurrentID = 0;
// var rootUrl = 'http://10.11.1.56:8080/geoserver/ows';
//var rootUrl = 'http://10.11.1.40:8082/geoserver/tgn/tide_gauges_wfs/wfs?';
var rootUrl = 'http://eutgn.marine.ie/geoserver/tgn/tide_gauges_wfs/wfs?';
var sacgroup = new L.featureGroup()
var defaultParameters = {
    service: 'WFS',
    version: '2.0.0',
    request: 'GetFeature',
    //typeName: '/ProtectedSites:testxmlgenerationdata',
    typeName: 'tgn:tide_gauges_wfs',
    maxFeatures: 2000,
    outputFormat: 'text/javascript',
    format_options: 'callback: getJson',
    //SrsName: 'EPSG:4326'
};

/// SAC Layer ///
var parameters = L.Util.extend(defaultParameters);
/// SAC Layer ///
var layer1 = $.ajax({
    jsonp: false,
    url: rootUrl + L.Util.getParamString(parameters),
    dataType: 'jsonp',
    jsonpCallback: 'getJson',
    success: handleJson2
});
/// SAC Layer ///
var group = new L.featureGroup();
var protectsaccoords = [];
var geojsonlayer;
var layerprops;

function handleJson2(data1) {
    //alert("success");
    var geojsonMarkerOptions = {
        opacity: 0.5,
        color:"red"
    };

    var iconSize= [14, 28]
    var iconAnchor= [7, 28]
    var popupAnchor= [1, -34]
    var shadowSize= [5, 5]

    
    var largeiconSize= [25, 50]
    var largeiconAnchor= [12, 50]
    

    var redIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: iconSize,
        iconAnchor: iconAnchor,
        popupAnchor: popupAnchor,
        shadowSize: shadowSize
        
    });

    var orangeIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: iconSize,
        iconAnchor: iconAnchor,
        shadowSize: shadowSize
    });

    var blueIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: iconSize,
        iconAnchor: iconAnchor,
        shadowSize: shadowSize
    });
    var greenIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: iconSize,
        iconAnchor: iconAnchor,
        shadowSize: shadowSize
        
       
    });


    var largeRedIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: largeiconSize,
        iconAnchor: largeiconAnchor,
        popupAnchor: popupAnchor,
        shadowSize: shadowSize
        
    });

    var largeOrangeIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: largeiconSize,
        iconAnchor: largeiconAnchor,
        shadowSize: shadowSize
    });

    var largeBlueIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: largeiconSize,
        iconAnchor: largeiconAnchor,
        shadowSize: shadowSize
    });
    var largeGreenIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: largeiconSize,
        iconAnchor: largeiconAnchor,
        shadowSize: shadowSize
        
       
    });

    // map.on('zoomend', function() {
    //     //alert('zooming')
    //     var currentZoom = map.getZoom();
    //     //alert(currentZoom)
    //     originalZoom = 14
    //     if(currentZoom>4)
    //     {   
    //         var metadata_status = L.geoJSON(data1, {
    //             pointToLayer: function (feature, latlng) {
                   
    //                 if (feature.properties.metadata_status <= 35){
    //                     setIcon= L.marker(latlng, {icon: largeRedIcon });
    //                     return setIcon;
    //                 }
    //                 else if (feature.properties.metadata_status > 35 & feature.properties.metadata_status <=70 ){
    //                     return L.marker(latlng, {icon: largeOrangeIcon });
    //                 }
    //                 else if (feature.properties.metadata_status > 70){
    //                     return L.marker(latlng, {icon: largeGreenIcon });
    //                 }
    //                 else{
    //                     return L.marker(latlng, {icon: icon});
    //                 }
             
    //             }
            
    //         });
    //     } 
        
    
    // });

    
    var myIcon = L.icon({
        iconUrl:  'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        //imagePath: 'C:/Users/tkeena/Desktop/markerRed.png',
        //"C:\Users\tkeena\Downloads\icons8-marker-48 green.png"
        iconSize: [15, 23]
      });

    var metadata_status = L.geoJSON(data1, {
        pointToLayer: function (feature, latlng) {

            var currentZoom = map.getZoom();
            radius=4;
           
            if (feature.properties.metadata_status <= 35){
                //setIcon= L.marker(latlng, {icon: redIcon });
                setIcon= L.circleMarker(latlng, {radius: radius,color: 'red'});
                //alert(radius);
                return setIcon;
            }
            else if (feature.properties.metadata_status > 35 & feature.properties.metadata_status <=70 ){
                //return L.marker(latlng, {icon: orangeIcon });
                return L.circleMarker(latlng, {radius: radius,color: 'orange'});

            }
            else if (feature.properties.metadata_status > 70){
                // return L.circleMarker(latlng, {icon: greenIcon });
                return L.circleMarker(latlng, {radius: radius,color: 'green'});

            }
            else{
                return L.marker(latlng, {icon: icon});
            }
     
        },
        onEachFeature: function (feature, my_Layer) {
            attributes = Object.keys(feature.properties);
            attributesStatus = feature.properties.datasetnam;
            protectsaccoords.push(feature.geometry.coordinates[0][0]);
            var popupHTML = '<table id="myTable">';
            var currentAttribute = "";
            $(attributes).each(function (index) {
                currentAttribute = getAttributeNames(index);
                popupHTML += '<tr><td>' + currentAttribute + ": " + '</td><td>' + feature
                    .properties[attributes[
                        index]] + '</td></tr>';
            })

            var popup2 = popupHTML +
                '<table id="goToRecord_Btn"><tr><td style="text-align: center">' +
                '<input type="button" value="View Record" onclick="goToRecord()" class="btn btn-primary"></input>' +
                '</tr></td></table>'
            my_Layer.bindPopup(popup2, {
                maxWidth: 600
            });
            my_Layer.addTo(map);
            my_Layer.on({
                click: whenClicked
            })
        },
      
        // filter: function (feature, layer) {
        //     return (feature.properties.metadata_status === 22);
        // }
    });

    // var GlossFalseLayer = L.geoJSON(data1, {
    //     pointToLayer: function (feature, latlng) {
    //        // return L.marker(latlng, {icon: myIcon });
           
    //        return L.marker(latlng);
    //     },

        
        
    //     onEachFeature: function (feature, my_Layer) {
    //         attributes = Object.keys(feature.properties);
    //         attributesStatus = feature.properties.datasetnam;
    //         //layerprops = feature.properties;
    //         //searcharray.push([feature.properties.id,my_Layer])
    //         protectsaccoords.push(feature.geometry.coordinates[0][0]);
    //         var popupHTML = '<table id="myTable">';
    //         var currentAttribute = "";
    //         $(attributes).each(function (index) {
    //             currentAttribute = getAttributeNames(index);
    //            popupHTML += '<tr><td>' + currentAttribute + ": " + '</td><td>' + feature
    //            .properties[attributes[
    //                index]] + '</td></tr>';
              
    //         })

    //         var popup2 = popupHTML +
    //             '<table id="goToRecord_Btn"><tr><td style="text-align: center">' +
    //             '<input type="button" value="View Record" onclick="goToRecord()" class="btn btn-primary"></input>' +
    //             '</tr></td></table>'
    //         my_Layer.bindPopup(popup2, {
    //             maxWidth: 600
    //         });
    //         my_Layer.addTo(map);
    //         my_Layer.on({
    //             click: whenClicked
    //         })
    //     },
    //     filter: function (feature, layer) {
    //         return (feature.properties.isglossstation !== 'yes');
    //     }
    // });
  
    //marker_TideGauge.png
    GaugeTypes = L.layerGroup([metadata_status ]).addTo(map);
    //GaugeTypeGlossFalse = L.layerGroup([GlossFalseLayer]).addTo(map);
    
    var overlayMaps = {
        "Gauges": GaugeTypes,
        "Medium": GaugeTypeGlossFalse
    };

    var baseMaps = {
        "Basemap": basemap,
        "Esri_OceanBasemap":Esri_OceanBasemap,
        "Esri_WorldImagery":Esri_WorldImagery
    };

     //map legend
  var legend = L.control({position: 'bottomleft'});
  legend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend');
  labels = ['<strong>Metadata Content</strong>'],
  categories = ['Low (<35%)','Medium (35-70%)','High (>70%)'];

  for (var i = 0; i < categories.length; i++) {

          div.innerHTML += 
          labels.push(
              '<i class="circle" style="background:' + getColor(categories[i]) + '"></i> ' +

          (categories[i] ? categories[i] : '+'));
      }
      div.innerHTML = labels.join('<br>');
  return div;
  };
  legend.addTo(map);
  
//   L.control.layers(baseMaps,overlayMaps).addTo(map);  
L.control.layers(baseMaps).addTo(map);  

}


function getAttributeNames(index){
    currentAttribute = attributes[index]; 
    if (attributes[index] == "id") {
        currentAttribute = "ID";
        //alert("ID" + attributes[index]);
        } else if (attributes[index] == "abstr") {
        currentAttribute = "Abstract";
        } else if (attributes[index] == "stt_n") {
        currentAttribute = "Station Name";
        } else if (attributes[index] == "hst_o") {
        currentAttribute = "Host Organisation";
        } else if (attributes[index] == "cn__1") {
        currentAttribute = "Contact1";
        } else if (attributes[index] == "cn__2") {
        currentAttribute = "Town/City";
        } else if (attributes[index] == "cn__3") {
        currentAttribute = "Region";
        } else if (attributes[index] == "cn__4") {
        currentAttribute = "Postal Code";
        } else if (attributes[index] == "cn__5") {
        currentAttribute = "Country";
        } else if (attributes[index] == "cn__6") {
        currentAttribute = "Email";
        } else if (attributes[index] == "cn__7") {
        currentAttribute = "Phone";
        } else if (attributes[index] == "cn__8") {
        currentAttribute = "Fax";
        } else if (attributes[index] == "prg__") {
        currentAttribute = "Program management contact";
        } else if (attributes[index] == "tchn_") {
        currentAttribute = "Technical contact";
        } else if (attributes[index] == "fn____") {
        currentAttribute = "Funding source (main)";
        } else if (attributes[index] == "i____") {
        currentAttribute = "Is sensor managed (1yes, 2 no)";
        } else if (attributes[index] == "wtr_lvl_ns") {
        currentAttribute = "Water level instrument(s) servicing frequency";
        } else {
        currentAttribute = attributes[index];
    }
    return currentAttribute;             
}

function getColor(d) {
    return d === 'Low (<35%)'  ? "#de2d26" :
           d === 'Medium (35-70%)'  ? "Orange" :
           d === 'High (>70%)' ? "#4daf4a" :
                        "#ff7f00";
}


// function style(feature) {
//     return {
//         weight: 1.5,
//         opacity: 1,
//         fillOpacity: 1,
//         radius: 6,
//         fillColor: getColor(feature.properties.metadata_status),
//         color: "grey"

//     };
// }

function whenClicked(e) {
    getCurrentID = e.target.feature.properties.id;
}

function goToRecord() {
    map.closePopup();
    var URL = window.location.href;
    alert(URL);
    var URL2 = URL.replace(/\/[^\/]*$/, '/metadata/' + getCurrentID);
    window.location.href = URL2
    //'http://localhost:8080/geonetwork/srv/eng/catalog.search#/metadata/241';
    //map: http://localhost:8080/geonetwork/srv/eng/catalog.search#/map
}