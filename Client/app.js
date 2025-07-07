function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for (var i = 0; i < uiBathrooms.length; i++) {
    if (uiBathrooms[i].checked) {
      return parseInt(uiBathrooms[i].value);
    }
  }
  return -1;
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for (var i = 0; i < uiBHK.length; i++) {
    if (uiBHK[i].checked) {
      return parseInt(uiBHK[i].value);
    }
  }
  return -1;
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var sqft = document.getElementById("uiSqft").value;
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations").value;
  var estPrice = document.getElementById("uiEstimatedPrice");

  if (!location) {
    alert("Please select a location");
    return;
  }

var url = "http://127.0.0.1:5000/api/predict_home_price";


  $.post(url, {
    total_sqft: parseFloat(sqft),
    bhk: bhk,
    bath: bathrooms,
    location: location
  }, function(data, status) {
    console.log(data);
    if (data.estimated_price) {
      estPrice.innerHTML = "<h2>₹ " + data.estimated_price.toString() + " Lakh</h2>";
    } else {
      estPrice.innerHTML = "<h2>Something went wrong</h2>";
    }
  });
}

function onPageLoad() {
  console.log("document loaded");
  var url = "/api/get_location_names";
  $.get(url, function(data) {
    console.log("got response for get_location_names request");
    if (data) {
      var locations = data.locations;
      $('#uiLocations').empty();
      $('#uiLocations').append(new Option("Choose a Location", "", true, true));
      for (var i in locations) {
        var opt = new Option(locations[i]);
        $('#uiLocations').append(opt);
      }
    }
  });
}

window.onload = onPageLoad;
  