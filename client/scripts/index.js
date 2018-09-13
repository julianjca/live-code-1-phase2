const app = new Vue({
  el: '#app',
  data: {
    message: '',
    isLogin : false
  },

  methods :{
    checkingLogin(data){
      axios({
        method: 'POST',
        url: 'http://localhost:3000/users/login',
        data: {
          email: data.email,
          password: data.password
        }
      }).
      then(res=>{
        if(res!==null){
          localStorage.setItem('token',res.data.token);
          app.message = "Login Success";
          setTimeout(() => {
            app.message = "";
          }, 3000);
          app.isLogin = true;
        }
        else{
          app.message = "username/password is wrong";
          setTimeout(() => {
            app.message = "";
          }, 3000);
        }

      })
      .catch(err=>{
        app.message = "username/password is wrong";
        setTimeout(() => {
          app.message = "";
        }, 3000);
      });
    },

    logOut(){
      localStorage.removeItem('token');
      this.isLogin = false;
    }
  }
});