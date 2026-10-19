function updateView() {
  document.getElementById("list-page").innerHTML = /*html*/ `
    <div>
      <h2>notenet</h2>
      
      <div>
        <h1></h1>
        <span>0 / 0</span>
      </div>

      <div>
        <input type="text" placeholder="Legg til nytt element..." />
        <button>+</button>
      </div>

      <ul>
        <!-- Tom liste for oppgaver -->
      </ul>

      <h3>Fullført oppgaver</h3>
      <ul>
        <!-- Tom liste for fullførte oppgaver -->
      </ul>
    </div>
    `;
}

updateView();
