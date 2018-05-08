var vm = new Vue({
  el:'#app',
  data: {
    users : [],
    email:{title:''},
    password:{password:''},
    passwordSingUp:{password:''},
    emailSingUp:{title:''},
    name:{name:''},
    surname:{surname:''},
    token:undefined,
    textChat:[],
    newMessage:{message:''},
    singInShow : false,
    singUpShow : false,
    me : {},
    chatId:{id:''},
    dataSent:{},
    datasent:false,
    datasentError:false
  },
  watch: {
    'token': function(newValue, oldValue) {
      if (newValue !== null) {
        localStorage.setItem('token', newValue);
      }
    }
  },
  methods:{
      singin:function(){
        var body = {email:this.email.title,password:this.password.password}
        console.log(body)
        this.$http.post('http://localhost:3001/login', body)
        .then(response=>{
          if(response.body.token){
            this.token=response.body.token;
            localStorage.setItem('token', this.token);
            this.email.title = '';
            this.password.password = '';
            this.getUsers()
            this.getMe()
        }
      })
    },
    singup:function() {
      var body = {email:this.emailSingUp.title,password:this.passwordSingUp.password,name:this.name.name,surname:this.surname.surname}
      this.$http.post('http://localhost:3001/signup', body)
      .then(response=>{
        this.emailSingUp.title = '';
        this.passwordSingUp.password = '';
        this.name.name = '';
        this.surname.surname = '';
        this.dataSent = body;
        this.datasent = true;
        this.datasentError=false
      }, response => {
        this.datasentError=true
        this.datasent = false;
    })
    },
    openSingIn : function(){
      this.singInShow = !this.singInShow
    },
    openSingUp : function(){
      this.singUpShow = !this.singUpShow
    },
    sendMessage:function(){
      var body = {text:this.newMessage.message}
        this.$http.put(`http://localhost:3001/chats/${this.chatId.id}?token=${this.token}`, body)
        .then(response => {
          this.getText()
          this.newMessage.message=''
        })
    },
    getText:function(){
      if(this.token.toString()!='undefined'){
        this.$http.get(`http://localhost:3001/chats/${this.chatId.id}?token=${this.token}`)
        .then(response => {
          this.textChat=response.body
        })
      }else{
        this.textChat = [];
      }
    },
    getIdChat : function(id){
      this.$http.post(`http://localhost:3001/chats?token=${this.token}&user=${id}`)
      .then(response =>{
        this.chatId.id=response.body._id;
        this.getText()
      })
    },
    getUsers:function(){
      if(this.token.toString()!='undefined'){
      this.$http.get(`http://localhost:3001/users?token=${this.token}`)
      .then(response => {
        this.users = response.body;
      })
    }else{
      this.users = [];
      this.me = {}
    }
    },
    getMe : function(){
      if(this.token.toString()!='undefined'){
      this.$http.get(`http://localhost:3001/me?token=${this.token}`)
      .then(response => {
        this.me = response.body
      })
    }else{
      this.me = {};
    }
    },
    logout : function(){
      this.token=undefined;
      localStorage.setItem('token', undefined);
      this.getText();
      this.users = [];
      this.me = {}
    }
  },
  created(){
    if(localStorage.getItem('token')){
      this.token=localStorage.getItem('token');
    }
      this.getUsers()
      this.getMe()
  }
})
