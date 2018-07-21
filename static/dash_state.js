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