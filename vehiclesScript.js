const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
const id = params.id;

const loadVehicles = async () => {
  const vehiclesDiv = document.getElementById("vehicles");
  let isEmpty = false;

  httpGetAsync(`https://swapi.dev/api/people/${id}`, (responseText) => {
    const data = JSON.parse(responseText);
    const { vehicles: vehicleUrls, name } = data;
    const h1 = document.getElementById("vehiclesText");
    const title = document.createTextNode(
      vehicleUrls?.length > 0
        ? `${name}'s Vehicles`
        : `${name} does not have any vehicles.`
    );

    h1.appendChild(title);
    vehicleUrls.forEach((url) => {
      httpGetAsync(url, (responseText) => {
        const vehicleDiv = document.createElement("div");
        vehicleDiv.classList.add("box");
        vehicleDiv.classList.add("vehicle");
        const vehicle = JSON.parse(responseText);
        console.log(vehicle);

        // Create Heading
        const vehicleHeading = document.createElement("h2");
        const vehicleName = document.createTextNode(vehicle.name);
        vehicleHeading.appendChild(vehicleName);

        // Add vehicle info
        const vehicleInfo = document.createElement("ul");
        // Add vehicle model
        const vehicleModelLi = document.createElement("li");
        const vehicleModel = document.createTextNode(`Model: ${vehicle.model}`);
        vehicleModelLi.appendChild(vehicleModel);
        // Add vehicle manufacturer
        const vehicleManufacturerLi = document.createElement("li");
        const vehicleManufacturer = document.createTextNode(
          `Manufacturer: ${vehicle.manufacturer}`
        );
        vehicleManufacturerLi.appendChild(vehicleManufacturer);
        // Add vehicle cost
        const vehicleCostLi = document.createElement("li");
        const vehicleCost = document.createTextNode(
          `Cost: ${vehicle.cost_in_credits} credits`
        );
        vehicleCostLi.appendChild(vehicleCost);
        // Add vehicle Class Color
        const vehicleClassLi = document.createElement("li");
        const vehicleClass = document.createTextNode(
          `Class: ${vehicle.vehicle_class}`
        );
        vehicleClassLi.appendChild(vehicleClass);
        // Add vehicle Cargo Capacity
        const vehicleCargoCapacityLi = document.createElement("li");
        const vehicleCargoCapacity = document.createTextNode(
          `Cargo_Capacity: ${vehicle.cargo_capacity}`
        );
        vehicleCargoCapacityLi.appendChild(vehicleCargoCapacity);
        // Append Info to UL
        vehicleInfo.appendChild(vehicleModelLi);
        vehicleInfo.appendChild(vehicleManufacturerLi);
        vehicleInfo.appendChild(vehicleCostLi);
        vehicleInfo.appendChild(vehicleClassLi);
        vehicleInfo.appendChild(vehicleCargoCapacityLi);

        vehicleDiv.appendChild(vehicleHeading); // includes heading
        vehicleDiv.appendChild(vehicleInfo);
        vehiclesDiv.appendChild(vehicleDiv);
      });
    });
  });
};

const httpGetAsync = (url, callback) => {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = () => {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  };
  xmlHttp.open("GET", url, true); // true for asynchronous
  xmlHttp.send(null);
};

const main = async () => {
  try {
    await loadVehicles();
  } catch (e) {
    console.log("Loading Vehicles Failed");
  }
};

main();
