const app = new Vue({
  el: '#app',
  data: {
    message: '',
    isLogin : false,
    quotes : [],
    isUserQuote : false,
    logid : '',
    container : ''
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
      this.logid = '';
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
          app.quotes.push(res.data);
        })
        .catch(err=>{
          console.log(err);
        });
      })
      .catch(err=>{
        console.log(err);
      });

  },

  removeQuote(id){
    axios({
      method : "delete",
      url: `http://localhost:3000/quotes/${id}`
    })
    .then(data=>{
      for(let i = 0;i<app.quotes.length;i++){
        if(app.quotes[i]._id===id){
          app.quotes.splice(i,1);
        }
      }
    })
    .catch(err=>{
      console.log(err);
    });
  },

  translateText(status,index,quoteTranslated){
    axios({
      method : "post",
      url: `http://localhost:3000/translate`,
      data : {
        text : status
      }
    })
    .then(data=>{
      console.log(data.data.text);
      app.container = data.data.text;
    })
    .catch(err=>{
      console.log(err);
    });
  }

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
        console.log(data);
        app.isLogin = true;
        app.logid = data.data.id;
      })
      .catch(err=>{
        console.log(err);
      });

        axios({
          method : "get",
          url: 'http://localhost:3000/quotes'
        })
        .then(data=>{
          app.quotes = data.data;
        })
        .catch(err=>{
          console.log(err);
        });
    }
});