
var markers = [];

var map;
    
function initMap() {

    var mapOptions = {
        center: { lat: 37.9838, lng: 23.7275 }, 
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.HYBRID
        
        
    };


    map = new google.maps.Map(document.getElementById('map'), mapOptions);


}


google.maps.event.addDomListener(window, 'load', initMap);




function routes_combo_box() {
    let select = document.getElementById("routes")
    for(let i = 0; i < routes['routes'].length; i++) {
        option = document.createElement('option')
        option.value = routes['routes'][i]['id']
        option.innerText = routes['routes'][i]['title']
        select.appendChild(option)
    }
}

function get_points() {
    let data = '';
    let selection = document.getElementById("routes").value
    if (selection == 1) {
        data = acropolis
    } else if (selection == 2) {
        data = monastiraki
    } else if (selection == 3) {
        data = lemesos
    }

    console.log(data['points'])

    let ul = document.getElementById('points');
    ul.innerHTML = '';
    
    for (let i = 0; i < data['points'].length; i++) {
        let li = document.createElement('li');
        let title = data['points'][i]['title'];
    
        li.innerHTML = `<h3>${title}</h3>`;
    
        if (i < data['points'].length - 1) {
            let time = data['points'][i]['time'];
            let bikeTime = calculateBikeTime(time);
    
            li.innerHTML += `<i class="bi bi-person-walking"> ${time} min</i><br><i class="bi bi-bicycle"> ${bikeTime} minutes</i>`;
        }
    
        ul.append(li);
    }
    
    function calculateBikeTime(time) {
        const reductionPercentage = 45;
        let bikeTime = time - (time * (reductionPercentage / 100));
        return Math.max(bikeTime, 0);
}


    clearMarkers();

    for (let i = 0; i < data['points'].length; i++) {
        let location = { lat: parseFloat(data['points'][i]['lat']), lng: parseFloat(data['points'][i]['lon']) };
        let marker = new google.maps.Marker({
            position: location,
            map: map,
            title: data['points'][i]['title']
            
        });

        let infoWindow = new google.maps.InfoWindow({
            content: `<div>
            <h3><a><img src="${data['points'][i]['picture']}" alt="thumbnail" class="img-thumbnail m-2" style="width: 200px">${data['points'][i]['title']}</a></h3>
            <p class="fs-5">${data['points'][i]['description']}</p>
            <p class="fs-5"><a href="${data['points'][i]['wikiurl']}" target="_blank" class="link-info">${data['points'][i]['wikiurl']}</a></p>
            </div>`
        });

        marker.addListener('click', function () {
            infoWindow.open(map, marker);
        });
        markers.push(marker);
    }


    fitMapBounds();
}


function clearMarkers() {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}


function fitMapBounds() {
    if (markers.length > 0) {
        let bounds = new google.maps.LatLngBounds();
        for (let i = 0; i < markers.length; i++) {
            bounds.extend(markers[i].getPosition());
        }
        map.fitBounds(bounds);
    }
}

google.maps.event.addDomListener(window, 'load', initMap);

var routes = {"routes": [{"id": "1", "filename": "acropolis.csv", "title": "Around Acropolis of Athens"}, {"id": "2", "filename": "monastiraki.csv", "title": "An evening in Monastiraki"}, {"id": "3", "filename": "lemesos.csv", "title": " A day in limassol"}]}
        var monastiraki = {"points": [{"id": "1", "title": "Monastiraki Square", "lon": "23.725812", "lat": "37.976387", "description": "Historic square in Athens", "wikiurl": "https://en.wikipedia.org/wiki/Monastiraki", "picture": "pictures/monastiraki.png", "time": "3"}, {"id": "2", "title": "Thanassis Kebab", "lon": "23.727093", "lat": "37.976210", "description": "famous for delicious Greek kebabs", "wikiurl": "No Wiki", "picture": "pictures/thanasis.png", "time": "6"}, {"id": "3", "title": "Museum Of Illusions", "lon": "23.722739", "lat": "37.976732", "description": "Interactive museum in Athens featuring mind-bending exhibits and optical illusions", "wikiurl": "https://museumofillusions.gr/athens/en/about-us/", "picture": "pictures/illusions.png", "time": null}]}
        var acropolis = {"points": [{"id": "1", "title": "Acropolis Museum", "lon": "23.7283", "lat": "37.9685", "description": "Modern museum near the Acropolis in Athens showcasing ancient artifacts and sculptures from the Acropolis.", "wikiurl": "https://en.wikipedia.org/wiki/Acropolis_Museum", "picture": "pictures/acropolis_museum.png", "time": "10"}, {"id": "2", "title": "Parthenon", "lon": "23.7268", "lat": "37.9715", "description": "Iconic ancient temple on the Acropolis in Athens and was built in the 5th century BCE dedicated to the goddess Athena.", "wikiurl": "https://en.wikipedia.org/wiki/Parthenon", "picture": "pictures/parthenon.png", "time": "2"}, {"id": "3", "title": "Herodion", "lon": "23.724495", "lat": "37.970585", "description": "Historic amphitheater on the southern slope of the Acropolis in Athens and was built in 161 AD now a venue for concerts and events.", "wikiurl": "https://en.wikipedia.org/wiki/Odeon_of_Herodes_Atticus", "picture": "pictures/herodion.png", "time": null}]}    
        var lemesos = {"points": [{"id": "1", "title": "Limassol Molos", "lon": "33.048168", "lat": "34.675557", "description": "Ideal for a leisurely stroll along the Mediterranean Sea with cafes and shops.", "wikiurl": "No Wiki", "picture": "pictures/molos.png", "time": "12"}, {"id": "2", "title": "Limassol Castle", "lon": "33.041971", "lat": "34.672294", "description": "Historic medieval fortress in the heart of Limassol", "wikiurl": "https://en.wikipedia.org/wiki/Limassol_Castle", "picture": "pictures/limassol_castle.png", "time": "7"}, {"id": 
        "3", "title": "Saripolou Square", "lon": "33.043208", "lat": "34.675499", "description": "Lively public square in central Limassol and a great place for food", "wikiurl": "No Wiki", "picture": "pictures/saripolou.png", "time": null}]}

