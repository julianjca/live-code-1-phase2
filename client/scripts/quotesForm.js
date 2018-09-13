Vue.component('add-quote',{
  template : `
  <div class="col-lg-9 col-sm-9 portfolio-item">
      <form>
      <div class="form-group">
        <textarea class="form-control" rows="3" placeholder="Quotes" v-model="quote"></textarea>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" @click="submitQuote">Submit</button>
      </div>
      </form>


  </div>
  `,
  data : function(){
    return {
      quote : '',
    };
  },
  methods : {
    submitQuote(){
      const quote = this.quote;
      this.$emit("adding-quote",quote);
      this.quote = "";
    }
  }
});