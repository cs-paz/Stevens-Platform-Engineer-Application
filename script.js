// definition
const loadCharacters = () => {
  const charactersDiv = document.getElementById("characters");

  httpGetAsync("https://swapi.dev/api/people", (responseText) => {
    const characters = JSON.parse(responseText).results;
    console.log(characters);
    characters.forEach((character) => {
      // Create main div
      const characterDiv = document.createElement("div");
      // Create Heading
      const characterHeading = document.createElement("h2");
      const characterName = document.createTextNode(character.name);
      characterHeading.appendChild(characterName);
      // Add character info
      const characterInfo = document.createElement("ul");
      // Add Character Height
      const characterHeightLi = document.createElement("li");
      const characterHeight = document.createTextNode(
        `Height: ${character.height}`
      );
      characterHeightLi.appendChild(characterHeight);
      // Add Character Mass
      const characterMassLi = document.createElement("li");
      const characterMass = document.createTextNode(`Mass: ${character.mass}`);
      characterMassLi.appendChild(characterMass);
      // Add Character Gender
      const characterGenderLi = document.createElement("li");
      const characterGender = document.createTextNode(
        `Gender: ${character.gender}`
      );
      characterGenderLi.appendChild(characterGender);
      // Add Character Hair Color
      const characterHairLi = document.createElement("li");
      const characterHair = document.createTextNode(
        `Hair Color: ${character.hair_color}`
      );
      characterHairLi.appendChild(characterHair);
      // Add Character Eye Color
      const characterEyeLi = document.createElement("li");
      const characterEye = document.createTextNode(
        `Eye Color: ${character.eye_color}`
      );
      characterEyeLi.appendChild(characterEye);
      // Append Info to UL
      characterInfo.appendChild(characterGenderLi);
      characterInfo.appendChild(characterHeightLi);
      characterInfo.appendChild(characterMassLi);
      characterInfo.appendChild(characterHairLi);
      characterInfo.appendChild(characterEyeLi);

      characterDiv.appendChild(characterHeading);
      characterDiv.appendChild(characterInfo);
      charactersDiv.appendChild(characterDiv);
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

// use
loadCharacters("http://your-cdn/jquery.js");
