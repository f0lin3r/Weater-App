jQuery(document).ready(function($) {
  $('#more').hide();
  var latitude;
   var longitude;
  var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  };
  function Weather(position) {
    latitude  = position.coords.latitude;
    longitude = position.coords.longitude;
    // console.log(latitude + '   '+ longitude);
    $.ajax({
      url:'https:fcc-weather-api.glitch.me/api/current?lat='+latitude+'&lon='+longitude,
      contentType: 'application/json',
      type: 'GET',
      dataType: 'jsonp',
      success: function(data){
        console.log(data);
        $('#out').html('<p>'+data.sys.country+' , '+data.name+'</p><img src='+data.weather[0].icon+'><p>'+data.weather[0].description+'</p><p>Temperature:'+data.main.temp+'°C</p>');
        }
      });
  }  
$('#btn').click(function(event) {
  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(Weather, error);
}else{error();}
  $('#btn').hide();
  $('#more').show();

});
     $('#more').click(function(event) {
       $('#more').hide();
         $.ajax({
      url:'https:fcc-weather-api.glitch.me/api/current?lat='+latitude+'&lon='+longitude,
      contentType: 'application/json',
      type: 'GET',
      dataType: 'jsonp',
      success: function(data){
        console.log(data);
        $('#out').html('<p>'+data.sys.country+' , '+data.name+'</p><img src='+data.weather[0].icon+'><p>'+data.weather[0].description+'</p><p>Temperature:'+data.main.temp+'°C</p><p>Max Temperature:'+data.main.temp_max+'°C</p><p>Min Temperature:'+data.main.temp_min+'°C</p><p>Pressure:'+data.main.pressure+'Pa</p><p>Humidity:'+data.main.humidity+'%</p><p>Wind speed:'+data.wind.speed+'m/s</p>');
        }
      });
     });
  function error() {
    output.innerHTML = "<p>Unable to retrieve your location</p.";
  };





});
