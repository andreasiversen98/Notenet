function updateView() {
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
          <button><img src="../../src/icons/trash.svg" width="14" alt="Delete"></button>
        </li>
      `;
    } else {
      uncompletedHtml += /*html*/ `
        <li>
          <input type="checkbox"> 
          ${item.text} 
          <button><img src="../../src/icons/trash.svg" width="14" alt="Delete"></button>
          ${list.isShared ? '<img src="../../src/icons/user-round.svg" width="14" alt="User">' : ""}
        </li>
      `;
    }
  }

  let html = "";

  if (list.isShared) {
    html = /*html*/ `
      <div>
        <h2>notenet</h2>
        
        <div>
          <img src="../../src/icons/globe.svg" width="16" alt="Shared"> 
          <button>invite</button> 
          <span>${list.members} members</span>
        </div>

        <div>
          <h1>${list.title}</h1>
          <span>${list.completedItems} / ${list.totalItems}</span>
        </div>

        <div>
          <input type="text" placeholder="Add new item..." />
          <button><img src="../../src/icons/square-plus.svg" width="16" alt="Add"></button>
        </div>

        <ul>
          ${uncompletedHtml}
        </ul>

        <h3>Completed tasks</h3>
        <ul>
          ${completedHtml}
        </ul>
      </div>
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

        <div>
          <input type="text" placeholder="Add new item..." />
          <button><img src="../../src/icons/square-plus.svg" width="16" alt="Add"></button>
        </div>

        <ul>
          ${uncompletedHtml}
        </ul>

        <h3>Completed tasks</h3>
        <ul>
          ${completedHtml}
        </ul>
      </div>
    `;
  }

  return html;
}

document.getElementById("list-page").innerHTML = updateView();
