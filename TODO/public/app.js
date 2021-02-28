var list = document.getElementById("list");


firebase.database().ref('todos').on('child_added',function(data){


    // create li tag with text node

    var li = document.createElement('li')

    var liText = document.createTextNode(data.val().value)

    li.appendChild(liText)


    // create delete button

    var delBtn = document.createElement("button")
    
    var delText = document.createTextNode("DELETE")
    
    delBtn.setAttribute("class", "btn btn-sm btn-danger m-3")

    delBtn.setAttribute('id',data.val().key)

    delBtn.setAttribute("onclick", "deleteItem(this)")
    
    delBtn.appendChild(delText)

    
    // create edit button
    
    var editBtn = document.createElement("button");
    
    var editText = document.createTextNode("EDIT")
    
    editBtn.setAttribute("class", "btn btn-sm btn-success m-1")
    
    editBtn.appendChild(editText)

    editBtn.setAttribute('id',data.val().key)

    editBtn.setAttribute("onclick", "editItem(this)")

    li.appendChild(delBtn)

    li.appendChild(editBtn)

    list.appendChild(li)

})

function AddTodo() {
    
    var todo_item = document.getElementById("todo-item");

    var database = firebase.database().ref('todos');

    var key = database.push().key;

    var todo = {

        value: todo_item.value,
        key: key

    }

    database.child(key).set(todo)

    todo_item.value = ""

}

function deleteItem(edit) {
    
    firebase.database().ref('todos').child(edit.id).remove()

    edit.parentNode.remove()
}

function editItem(edit) {

  var val = prompt("Enter New Value",edit.parentNode.firstChild.nodeValue);

  var edittodo = {

    value: val,
    key: edit.id

  }

  firebase.database().ref('todos').child(edit.id).set(edittodo)

  edit.parentNode.firstChild.nodeValue = val;

}

function DeleteAll() {

    firebase.database().ref('todos').remove();

    list.innerHTML = ""

}