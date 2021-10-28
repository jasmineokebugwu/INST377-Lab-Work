async function windowActions() {
  const endpoint = "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json";
  const request = await fetch(endpoint);
  const restaurants = await request.json();
  
  function findMatches(wordToMatch, restaurants) {
    return restaurants.filter((place) => {
    const regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.name.match(regex);
    });
}
  /*
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3}+(?!\d)))/g, ",");
    }
   */
  const searchInput = document.querySelector(".search");
  const suggestions = document.querySelector(".suggestions");
  
  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, restaurants);
    const html = matchArray
      .map((place) => {
        const regex = new RegExp(event.target.value, "gi");
        return `
          <li>
              <span class="city"> ${place.city} </span>
              <span class="name"> ${place.name} </span>
              <span class="address"> ${place.address} </span>
              <span class="zip"> ${place.zip} </span>
              <span class="category"> ${place.category} </span>
          </li>
          `;
      })
      .join("");
    suggestions.innerHTML = html;
  }
  
  searchInput.addEventListener("change", displayMatches);
  searchInput.addEventListener("keyup", (evt) => {
    displayMatches(evt);
  });
}
window.onload = windowActions;
