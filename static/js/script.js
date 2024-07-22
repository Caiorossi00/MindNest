document.addEventListener("DOMContentLoaded", () => {
  const inputArea = document.getElementById("input-area");
  const checklistContainer = document.getElementById("checklist-container");

  function addNewCategory(categoryName) {
    const newColumn = document.createElement("div");
    newColumn.classList.add("column");
    newColumn.id = categoryName.toLowerCase();

    const categoryTitle = document.createElement("h2");
    categoryTitle.textContent = categoryName;

    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("category-div");
    categoryDiv.style.display = "flex";
    categoryDiv.style.gap = "1em";
    categoryDiv.appendChild(categoryTitle);

    const newItemInput = document.createElement("input");
    newItemInput.type = "text";
    newItemInput.placeholder = "Insira o novo item";
    newItemInput.classList.add("new-item-input");

    const addItemBtn = document.createElement("button");
    addItemBtn.innerHTML = '<i class="fas fa-plus"></i>';
    addItemBtn.classList.add("add-item-btn");

    const removeCategoryBtn = document.createElement("button");
    removeCategoryBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    removeCategoryBtn.classList.add("remove-category-btn");

    addItemBtn.addEventListener("click", () => {
      const newItemName = newItemInput.value.trim();
      if (newItemName !== "") {
        addNewItem(newItemName, itemsList);
        newItemInput.value = "";
      } else {
        alert("Por favor, insira um nome para o novo item.");
      }
    });

    removeCategoryBtn.addEventListener("click", () => {
      newColumn.remove();
    });

    categoryDiv.appendChild(newItemInput);
    categoryDiv.appendChild(addItemBtn);
    categoryDiv.appendChild(removeCategoryBtn);

    newColumn.appendChild(categoryDiv);

    const itemsList = document.createElement("div");
    itemsList.classList.add("items-list");
    newColumn.appendChild(itemsList);

    checklistContainer.appendChild(newColumn);

    addItemBtn.addEventListener("click", () => {
      newItemInput.style.display = "block";
      newItemInput.focus();

      document.addEventListener("click", (event) => {
        if (
          !newItemInput.contains(event.target) &&
          !addItemBtn.contains(event.target)
        ) {
          newItemInput.value = "";
          newItemInput.style.display = "none";
          document.removeEventListener("click", this);
        }
      });
    });

    newItemInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const newItemName = newItemInput.value.trim();
        if (newItemName !== "") {
          addNewItem(newItemName, itemsList);
          newItemInput.value = "";
          newItemInput.style.display = "none";
        } else {
          alert("Por favor, insira um nome para o novo item.");
        }
      }
    });
  }

  function addNewItem(itemName, itemsList) {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");

    const innerDiv = document.createElement("div");
    innerDiv.classList.add("item-content");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("item-checkbox");
    innerDiv.appendChild(checkbox);

    const itemTitle = document.createElement("h3");
    itemTitle.classList.add("item-title");
    itemTitle.textContent = itemName;
    innerDiv.appendChild(itemTitle);

    const editItemBtn = document.createElement("button");
    editItemBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editItemBtn.classList.add("edit-item-btn");
    innerDiv.appendChild(editItemBtn);

    const saveItemBtn = document.createElement("button");
    saveItemBtn.textContent = "Salvar";
    saveItemBtn.classList.add("save-item-btn");
    saveItemBtn.style.display = "none";
    innerDiv.appendChild(saveItemBtn);

    editItemBtn.addEventListener("click", () => {
      itemTitle.style.display = "none";
      let editItemInput = itemDiv.querySelector(".edit-input");
      if (!editItemInput) {
        editItemInput = document.createElement("input");
        editItemInput.type = "text";
        editItemInput.classList.add("edit-input");
        itemDiv.appendChild(editItemInput);
      }
      editItemInput.value = itemTitle.textContent;
      editItemInput.style.display = "block";
      saveItemBtn.style.display = "block";
    });

    saveItemBtn.addEventListener("click", () => {
      itemTitle.textContent = itemDiv.querySelector(".edit-input").value.trim();
      itemTitle.style.display = "block";
      itemDiv.querySelector(".edit-input").style.display = "none";
      saveItemBtn.style.display = "none";
    });

    const newCommentInput = document.createElement("input");
    newCommentInput.type = "text";
    newCommentInput.placeholder = "Insira seu comentário";
    newCommentInput.classList.add("new-comment-input");
    innerDiv.appendChild(newCommentInput);

    const addCommentBtn = document.createElement("button");
    addCommentBtn.innerHTML = '<i class="fas fa-comment-medical"></i>';
    addCommentBtn.classList.add("add-comment-btn");
    innerDiv.appendChild(addCommentBtn);

    const commentsList = document.createElement("div");
    commentsList.classList.add("comments-list");
    innerDiv.appendChild(commentsList);

    addCommentBtn.addEventListener("click", () => {
      const newCommentText = newCommentInput.value.trim();
      if (newCommentText !== "") {
        addNewComment(newCommentText, commentsList);
        newCommentInput.value = "";
      } else {
        alert("Por favor, insira um comentário válido.");
      }
    });

    const removeItemBtn = document.createElement("button");
    removeItemBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    removeItemBtn.classList.add("remove-item-btn");
    innerDiv.appendChild(removeItemBtn);

    removeItemBtn.addEventListener("click", () => {
      itemDiv.remove();
    });

    itemDiv.appendChild(innerDiv);
    itemsList.appendChild(itemDiv);
  }

  function addNewComment(commentText, commentsList) {
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");

    const commentPara = document.createElement("p");
    commentPara.textContent = commentText;

    const editCommentBtn = document.createElement("button");
    editCommentBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editCommentBtn.classList.add("edit-comment-btn");

    const saveCommentBtn = document.createElement("button");
    saveCommentBtn.textContent = "Salvar";
    saveCommentBtn.classList.add("save-comment-btn");
    saveCommentBtn.style.display = "none";

    editCommentBtn.addEventListener("click", () => {
      commentPara.style.display = "none";
      let editCommentInput = commentDiv.querySelector(".edit-input");
      if (!editCommentInput) {
        editCommentInput = document.createElement("input");
        editCommentInput.type = "text";
        editCommentInput.classList.add("edit-input");
        commentDiv.appendChild(editCommentInput);
      }
      editCommentInput.value = commentPara.textContent;
      editCommentInput.style.display = "block";
      saveCommentBtn.style.display = "block";
    });

    saveCommentBtn.addEventListener("click", () => {
      commentPara.textContent = commentDiv
        .querySelector(".edit-input")
        .value.trim();
      commentPara.style.display = "block";
      commentDiv.querySelector(".edit-input").style.display = "none";
      saveCommentBtn.style.display = "none";
    });

    const removeCommentBtn = document.createElement("button");
    removeCommentBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    removeCommentBtn.classList.add("remove-comment-btn");

    removeCommentBtn.addEventListener("click", () => {
      commentDiv.remove();
    });

    commentDiv.appendChild(commentPara);
    commentDiv.appendChild(removeCommentBtn);
    commentDiv.appendChild(saveCommentBtn);
    commentDiv.appendChild(editCommentBtn);

    commentsList.appendChild(commentDiv);
  }

  inputArea.innerHTML = `
      <input type="text" id="category-input" placeholder="Nova Categoria">
      <button id="add-category-btn">Adicionar Categoria</button>
    `;

  const categoryInput = document.getElementById("category-input");
  const addCategoryBtn = document.getElementById("add-category-btn");

  addCategoryBtn.addEventListener("click", () => {
    const newCategoryName = categoryInput.value.trim();
    if (newCategoryName !== "") {
      addNewCategory(newCategoryName);
      categoryInput.value = "";
    } else {
      alert("Por favor, insira um nome para a nova categoria.");
    }
  });
});
 