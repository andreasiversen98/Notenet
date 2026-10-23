function listPageView() {
  const list = getCurrentList();
  if (!list) return "";

  let uncompletedHtml = "";
  let completedHtml = "";

  for (let i = 0; i < list.items.length; i++) {
    const item = list.items[i];
    if (item.isCompleted) {
      completedHtml += /*html*/ `
        <li>
          <input type="checkbox" checked onchange="toggleItemCompletion('${item.id}')"> 
          <button class="btn btn-icon" onclick="deleteItem('${item.id}')"><img src="../../src/icons/trash.svg" width="14" alt="Delete"></button>
          <span>${item.text}</span> 
        </li>
      `;
    } else {
      uncompletedHtml += /*html*/ `
        <li>
          <input type="checkbox" onchange="toggleItemCompletion('${item.id}')"> 
          <button class="btn btn-icon" onclick="deleteItem('${item.id}')"><img src="../../src/icons/trash.svg" width="14" alt="Delete"></button>
          <span>${item.text}</span> 
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
        
        <div class="list-title-row">
          <div>
            <h2>${list.title}</h2>
            <span class="counter">${list.completedItems} / ${list.totalItems}</span>
          </div>
          <div class="share-meta">
            <img src="../../src/icons/globe.svg" width="14" alt="Shared"> 
            <button class="btn invite-btn">invite</button> 
            <span class="member-count">${memberCount} members</span>
          </div>
        </div>

        <div class="input-box">
          <input 
              type="text" 
              placeholder="Add new item..." 
              value="${model.viewState.listPage.newItemTitle}" 
              oninput="model.viewState.listPage.newItemTitle = this.value" 
              onkeydown="if(event.key === 'Enter') pushNewItem()"
            />
          <button class="btn" onclick="pushNewItem()"><img src="../../src/icons/square-plus.svg" width="16" alt="Add"></button>
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
        ${headerComponent()}
        
        <div class="list-title-row">
          <div>
            <h2>${list.title}</h2>
            <span class="counter">${list.completedItems} / ${list.totalItems}</span>
          </div>
          <div class="share-meta">
            <img src="../../src/icons/lock.svg" width="14" alt="Private"> 
            <span class="member-count">private</span>
          </div>
        </div>

        <div class="input-box">
          <input 
              type="text" 
              placeholder="Add new item..." 
              value="${model.viewState.listPage.newItemTitle}" 
              oninput="model.viewState.listPage.newItemTitle = this.value" 
              onkeydown="if(event.key === 'Enter') pushNewItem()"
            />
          <button class="btn" onclick="pushNewItem()"><img src="../../src/icons/square-plus.svg" width="16" alt="Add"></button>
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
