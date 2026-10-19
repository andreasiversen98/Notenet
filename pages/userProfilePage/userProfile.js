const userApp = document.getElementById("user-profile")

function updateViewUser() {
   userApp.innerHTML = userProfileLayout() + getBottomBar()
}
updateViewUser()

function userProfileLayout() {
   return `
   <h1>notenet</h1>
   <img src="../../src/images/image.svg"></img>
   <h2>Hei user!</h2>
   <h3>sharecode</h3>
   <h4>premium</h4><img src="../../src/icons/circle-star.svg"></img>
   <div>
      <div>
         <span><img src="../../src/icons/infinity.svg"></img></span>
         <span>Alle</span>
         <span>24</span>
         <span><img src="../../src/icons/chevron-right.svg"></img></span>
      <div>

      <div>
         <span><img src="../../src/icons/globe.svg"></img></span>
         <span>Delte</span>
         <span>12</span>
         <span><img src="../../src/icons/chevron-right.svg"></img></span>
      <div>

      <div>
         <span><img src="../../src/icons/lock.svg"></img></span>
         <span>Privat</span>
         <span>2</span>
         <span><img src="../../src/icons/chevron-right.svg"></img></span>
      <div>

   </div>
   <button>kjøp premium</button>
   `
}