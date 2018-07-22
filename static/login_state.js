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
            ;
          } else {
            
            
            if (response.data.authenticated === true){
              window.location.replace("/dash");
            } 
          }
        
        })
        .catch((error)=>{

          ;
          
    });

  } 
}


function setToken(data){
  console.log(data);
  return new Promise(resolve => {
    resolve(localStorage.setItem('id',data));
  })

}


async function goHome(data){
  var complete = await setToken(data);
  
    window.location.replace("/dash");
  
}

function login(){

  axios.post("http://localhost:5000/api/login",{

        email: document.getElementById('loginEmail').value,
        password: document.getElementById('loginPassword').value
     
        })
        .then((response)=>{
        
          if(response.data.error){
            console.log(response.data.error);
            document.getElementById("error").innerHTML = response.data.error;
          } else {
            console.log(response.data);
            goHome(response.data.jwt_id);
            
          }
        
        })
        .catch((error)=>{

          ;
          
    });
}

function register(){

  axios.post("http://localhost:5000/api/register",{

        first_name: document.getElementById('registerFirstName').value,
        last_name: document.getElementById('registerLastName').value,
        home: document.getElementById('registerHome').value,
        email: document.getElementById('registerEmail').value,
        password: document.getElementById('registerPassword').value,
        confirm_password: document.getElementById('confirmPassword').value

        })
        .then((response)=>{
        
          if(response.data.error){
            ;
          } else {
            //console.log(response.data);
            goHome(response.data.jwt_id);
            /*
            if (resonse.data.jwt_id){
              goHome(response.data.jwt_id);
            }
            */
          }
        
        })
        .catch((error)=>{

          ;
          
    });

}