const app = new Vue({
  el: '#app',
  data: {
    message: '',
    isLogin : false,
    quotes : []
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
    },

    addQuote(quote){
      const token = localStorage.getItem("token");
      axios({
        method : "get",
        url: 'http://localhost:3000/users/auth',
        headers : {
          token : token
        }
      })
      .then(data=>{
        axios({
          method : "POST",
          url: 'http://localhost:3000/quotes',
          data : {
            status : quote,
            user : data.data.id
          }
        })
        .then(res=>{
          console.log(res);
        })
        .catch(err=>{
          console.log(err);
        });
      })
      .catch(err=>{
        console.log(err);
      });

  },

  created (){
    const token = localStorage.getItem("token");
      axios({
        method : "get",
        url: 'http://localhost:3000/users/auth',
        headers : {
          token : token
        }
      })
      .then(data=>{
        if(data.data!==null||data.data!==undefined){
          app.isLogin = true;
        }
        else{
          app.isLogin = false;
        }
      })
      .catch(err=>{
        console.log(err);
      });
  }
}
});