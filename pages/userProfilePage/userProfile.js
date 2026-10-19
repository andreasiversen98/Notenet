const userApp = document.getElementById("user-profile");

const testData = { ...model.data.users };

console.log(testData[0]);

const userData = testData[0]

function updateViewUser() {
   userApp.innerHTML = userProfileLayout() + getBottomBar();
}
updateViewUser();

function userProfileLayout() {
   return `
   <div class="flex column border width50 gap">
   <div class="flex row justify-between align-center padding">
      <h1>notenet</h1>
      <img class="icon-size" src="../../src/icons/ellipsis-vertical.svg"/>
   </div>
   <div class="flex row justify-between border padding">
      <div class="flex column border">
         <img class="image-size" src="${userData.profilePicture}"/>
         <div class="flex row align-center border gap">
            ${
               userData.isPremium
                  ? `
               <h4>premium</h4>
               <img class="icon-size" src="../../src/icons/circle-star.svg"/>`
                  : ``
            }
         </div>
      </div>
      <div class="border">
         <h2>hei ${userData.username}</h2>
         <h3 class="flex row justify-end">${userData.code}</h3>
      </div>
   </div>

   <div class="flex column border container gap padding">
      <div class="list-bar flex row justify-between border padding">
         <div class="flex row align-center gap">
         <img class="icon-size" src="../../src/icons/infinity.svg"/>
         <span>Alle</span>
         </div>
         <div class="flex row align-center gap">
         <span>24</span>
         <img class="icon-size" src="../../src/icons/chevron-right.svg"/>
         </div>
      </div>

      <div class="list-bar flex row justify-between border padding">
         <div class="flex row align-center gap">
         <img class="icon-size" src="../../src/icons/globe.svg"/>
         <span>Delte</span>
         </div>
         <div class="flex row align-center gap">
         <span>12</span>
         <img class="icon-size" src="../../src/icons/chevron-right.svg"/>
         </div>
      </div>

      <div class="list-bar flex row justify-between border padding">
         <div class="flex row align-center gap">
         <img class="icon-size" src="../../src/icons/lock.svg"/>
         <span>Privat</span>
         </div>
         <div class="flex row align-center gap">
         <span>2</span>
         <img class="icon-size" src="../../src/icons/chevron-right.svg"/>
         </div>
      </div>
   </div>

   <div class="flex row justify-center align-center padding">
      <button>kjøp premium</button>
   </div>
   </div>
   `;
}
