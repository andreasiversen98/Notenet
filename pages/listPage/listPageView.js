function listPageView() {
  const lists = model.data.lists;
  if (!model.viewState.listPage.selectedListId) {
    model.viewState.listPage.selectedListId = "l1";
  }
  const chosenListId = model.viewState.listPage.selectedListId;

  let list;
  for (let i = 0; i < lists.length; i++) {
    if (lists[i].id === chosenListId) {
      list = lists[i];
      break;
    }
  }

  let uncompletedHtml = "";
  let completedHtml = "";

  for (let i = 0; i < list.items.length; i++) {
    const item = list.items[i];
    if (item.isCompleted) {
      completedHtml += /*html*/ `
        <li>
          <input type="checkbox" checked> 
          ${item.text} 
          <button class="btn"><img src="../../src/icons/trash.svg" width="14" alt="Delete"></button>
        </li>
      `;
    } else {
      uncompletedHtml += /*html*/ `
        <li>
          <input type="checkbox"> 
          ${item.text} 
          <button class="btn"><img src="../../src/icons/trash.svg" width="14" alt="Delete"></button>
          ${list.isShared ? '<img src="../../src/icons/user-round.svg" width="14" alt="User">' : ""}
        </li>
      `;
    }
  }

  let html = "";

  if (list.isShared) {
    const memberCount = list.members ? list.members.length : 0;

    html = /*html*/ `
      ${headerComponent()}
        
        <div>
          <img src="../../src/icons/globe.svg" width="16" alt="Shared"> 
          <button class="btn">invite</button> 
          <span>${memberCount} members</span>
        </div>

        <div>
          <h1>${list.title}</h1>
          <span>${list.completedItems} / ${list.totalItems}</span>
        </div>

        <div class="input-box">
          <input type="text" placeholder="Add new item..." />
          <button class="btn"><img src="../../src/icons/square-plus.svg" width="16" alt="Add"></button>
        </div>

        <ul>
          ${uncompletedHtml}
        </ul>

        <h3>Completed tasks</h3>
        <ul>
          ${completedHtml}
        </ul>
      </div>

      ${getBottomBar()}
    `;
  } else {
    html = /*html*/ `
      <div>
        <h2>notenet</h2>
        
        <div>
          <img src="../../src/icons/lock.svg" width="16" alt="Private"> private
        </div>

        <div>
          <h1>${list.title}</h1>
          <span>${list.completedItems} / ${list.totalItems}</span>
        </div>

        <div class="input-box">
          <input type="text" placeholder="Add new item..." />
          <button class="btn"><img src="../../src/icons/square-plus.svg" width="16" alt="Add"></button>
        </div>

        <ul>
          ${uncompletedHtml}
        </ul>

        <h3>Completed tasks</h3>
        <ul>
          ${completedHtml}
        </ul>
      </div>

      ${getBottomBar()}
    `;
  }

  return html;
}
