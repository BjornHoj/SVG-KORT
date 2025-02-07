document.addEventListener("DOMContentLoaded", function () {
  runProgram();
});

async function runProgram() {
  let selected;
  let selectedID;
  let color;
  let active;

  // 1. Tilføj interaktivitet til punkterne i SVG'en
  let points = {
    Forum: document.querySelector("#Forum"),
    Nørreport: document.querySelector("#Nørreport"),
    Østerport: document.querySelector("#Østerport"),
  };

  Object.values(points).forEach((point) => {
    point.addEventListener("click", function (evt) {
      clicked(evt);
    });
  });

  // 2. Funktion: Hent og vis artikelindhold fra JSON
  async function loadArticleContent(sted) {
    try {
      let response = await fetch("oplysninger.json");
      let data = await response.json();

      let articleData = data[0].find((item) => item.sted === sted);

      if (articleData) {
        let article = document.querySelector("#dynamic-article");

        // Opdater indholdet
        article.innerHTML = `
          <h2>${articleData.sted}</h2>
          <p>${articleData.tekst}</p>
          <img src="${articleData.billede}.jpeg" alt="${articleData.sted}" />
        `;

        // Vis artiklen
        article.style.display = "block";
      }
    } catch (error) {
      console.error("Fejl ved indlæsning af JSON:", error);
    }
  }

  // 3. Funktion: Når et punkt i SVG'en klikkes
  function clicked(evt) {
    selected = evt.target;
    selectedID = selected.getAttribute("id");
    color = selected.getAttribute("fill");

    console.log("Selected ID:", selectedID);

    // Hvis et tidligere punkt var aktivt, reset farven
    if (active) {
      active.setAttribute("fill", "#f40000"); // Tilbage til rød
    }

    // Sæt det nye aktive punkt
    active = selected;
    selected.setAttribute("fill", "#123456"); // Skift farve til blå

    // Opdater artiklen baseret på det valgte punkt
    loadArticleContent(selectedID);
  }
}
