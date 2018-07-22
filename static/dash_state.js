function logOut(){
  localStorage.clear();
  window.location.replace("/");
}

function isLoggedIn(){

  if(localStorage.getItem('id') !== null){

    axios.get("http://localhost:5000/api/auth/user", {
          headers: {
            'Content-Type':'application/json',
            'x-access-token': `${localStorage.getItem('id')}`
          }
     
        })
        .then((response)=>{
        
          if(response.data.error){
            window.location.replace("/");
          } else {
            
            console.log(response.data);
            if (response.data.authenticated === false){
            	window.location.replace("/");
            } 

          }
        
        })
        .catch((error)=>{

          window.location.replace("/");
          
    });

  } 
}

function getUsers(){

  if(localStorage.getItem('id') !== null){

    axios.get("http://localhost:5000/api/users", {
          headers: {
            'Content-Type':'application/json',
            'x-access-token': `${localStorage.getItem('id')}`
          }
     
        })
        .then((response)=>{
        
          if(response.data.error){
            ;
          } else {
            
            console.log(response.data.users[0]);
            // make into a table object and put into an id on page
            let users_table = document.getElementById('users_table');
            buildTable(response.data.users, users_table);
          }
        
        })
        .catch((error)=>{

          window.location.replace("/");
          
    });

  } 
}

function deleteUser(user_id){
	
    console.log(user_id);
    // send id to back end to delete user
    //
    if(localStorage.getItem('id') !== null){

    axios.delete("http://localhost:5000/api/users/" + user_id, {
          headers: {
            'Content-Type':'application/json',
            'x-access-token': `${localStorage.getItem('id')}`
          }
     
        })
        .then((response)=>{
        
          if(response.data.error){
            ;
          } else {
            
            // I have delete a user, what do I do?
            // remove the element from table with the number in it
            let parent = document.getElementById("users_table");
            let child = document.getElementById(user_id);
            parent.removeChild(child);
          }
        
        })
        .catch((error)=>{

          window.location.replace("/");
          
    });

  } 
}



function buildTable(array, dom_object){
	
    let ticker_content = "<table><tr><th>id</th><th>first name</th><th>last name</th><th>home</th><th>email</th></tr><tbody>";
    
    array.forEach(function (element){
    
      let to_insert = `<tr id="${element.id}"><td>${element.id}</td>
                       <td>${element.first_name}</td>
                       <td>${element.last_name}</td>
                       <td>${element.home}</td>
                       <td>${element.email}</td>
                       <td><button onclick="deleteUser(${element.id})">deleteUser</button></td></tr>`;

      ticker_content += to_insert;
      

      
    });

    ticker_content += "</tbody></table>";
    dom_object.innerHTML = ticker_content;
    
}

