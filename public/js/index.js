// Get references to page elements
var $examplename = $("#example-text");
var $exampleDescription = $("#example-description");
var $exampleEmail = $("#example-email");
var $exampleAmount = $("#example-amount");
var $exampleNumber = $("#example-number");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");


// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  },
  updateExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "UPDATE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.name)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

        var $editBtn = $("<button>")
        .addClass("btn btn-default float-right edit ")
        .text("EDIT");
        

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("DELETE");

        $li.append($button);
        $li.append($editBtn);
    

      //   function deleteItem() {
      //     if (confirm("Are you sure?")) {
      //         // your deletion code
      //     }
      //     return false;
      // }


      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    name: $examplename.val().trim(),
    description: $exampleDescription.val().trim(),
    email: $exampleEmail.val().trim(),
    amount: $exampleAmount.val().trim(),
    number: $exampleNumber.val().trim(),
  };


  // if (!(example.name && example.description && example.email && example.amount && example.number)) {
  //   alert("You must enter an example name and description!");
  //   return;
  // }
  if (!(example.name && example.description && example.email && example.amount && example.number)) {
    alert("You must enter an example name and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $examplename.val("");
  $exampleDescription.val("");
  $exampleEmail.val("");
  $exampleAmount.val("");
  $exampleNumber.val("");


  // if (updating) {
  //   newPost.id = postId;
  //   updatePost(newPost);
  // }
  // else {
  //   submitPost(newPost);
  // }
};


// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
// var isDelete = prompt("Are You sure you want to delete?");
// // message = prompt("Enter text");
// if(isDelete == "null" || isDelete == null || isDelete == "" );
// {
//   console.log("You have typed null.");
//   refreshExamples();
// } if (isDelete == "yes" || isDelete == yes){
//   console.log("You have typed delete.");
//  \
// }else{
//   console.log("You have typed something else besides yes and leaving it blanked.");
//   refreshExamples();

// }

var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
  // console.log("Clicked the delete button")
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};


// var handleUpdateBtnClick = function() {
//   // console.log("Clicked the edit button")
//   var idToUpdate = $(this)
//     .parent()
//     .attr("data-id");
//     window.location.href = "/example/edit/" + idToUpdate.id;
//   API.updateExample(idToUpdate).then(function() {
//     refreshExamples();
//   });
// };



// This function figures out which post we want to edit and takes it to the
  // Appropriate url
  // function handlePostEdit() {
  //   var currentPost = $(this)
  //     .parent()
  //     .parent()
  //     .data("post");
  //   window.location.href = "/example?example_id=" + currentPost.id;
  // }
// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);

$exampleList.on("click", ".delete", handleDeleteBtnClick);
// $exampleUpdate.on("click", ".edit", handleUpdateBtnClick);


