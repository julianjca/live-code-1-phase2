Vue.component('main-login',{
  template : `
  <div class="header-right">
  <input type="text" v-model="email" placeholder="email">
  <input type="password" v-model = "password" placeholder="password">
  <button @click = "sendLogin">Login</button>
  </div>

  `,
  data : function(){
    return {
      email : '',
      password : ''
    };
  },
  methods : {
    sendLogin(){
      const data = {
        email : this.email,
        password : this.password
      };
      this.$emit('check-login',data);
    }
  }
});