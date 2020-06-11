
document.addEventListener('DOMContentLoaded',()=>{


  // let modalElement  = document.querySelector('.modal');
  // let instance = M.Modal.init(modalElement, {
  //   dismissible:false,
  //   startingTop:"30%",
  //   endingTop:"30%"
  // });

  //let username = document.querySelector('#username');

  let form = document.querySelector('form');
  let email = document.querySelector('#email');
  let password = document.querySelector('#pwd');
  const loginBtn = document.querySelector('.login-btn');
  let error_section = document.querySelector('.error');
  let errorState = false;

  email.focus();


  loginBtn.addEventListener('click',event =>{
   event.preventDefault();
     validate();
  })

 email.addEventListener('keyup',event =>{
  if(event.key == 'Enter'){ password.focus();}
})


let validate = ()=>{
let errorText='';
  
  if(email.value.trim() == '') {
    errorText = 'Email is required';
    errorState == true;
    showerror(errorText);
    return true;
  }
  
  if(email.value.length < 6 ) {
    errorText = 'A minimum of 6 characters is required';
    errorState == true;
    showerror(errorText);
    return true;
  }

 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value) == false){
  errorText = 'Enter a valid E-mail';
  errorState == true;
  showerror(errorText);
  return true;
}

if(password.value.trim() == '') {
  errorText = 'Password is required';
  errorState == true;
  showerror(errorText);
    return true;
}

if(password.value.length < 8 ) {
  errorText = 'A minimum of 8 characters is required';
  errorState == true;
  showerror(errorText);
  return true;
}
error_section.style.display = 'none';
login();

  }

  let showerror = (err)=>{
  error_section.textContent = err;
  error_section.style.display = 'block';
  // setTimeout(()=>{
  //   error_section.style.display = 'none';
  // },5000);
  }

  let login = ()=>{
    form.submit();
  
  }


}) // END OF DOM LISTENER
