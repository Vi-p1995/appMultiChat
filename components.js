Vue.component('singin-form', {
  props:['email','password','fn'],
  template: `

  <div class="col-3">
  <h1>Accedi</h1>
    <div class="form-group">
      <label >Email address</label>
      <input v-model='email.title' type="email" class="form-control" placeholder="Enter email">
    </div>
    <div class="form-group">
      <label >Password</label>
      <input v-model='password.password' type="password" class="form-control" placeholder="Password">
    </div>
    <button @click='fn' class="btn btn-primary">Submit</button>
  </div>

  `
} );

Vue.component('singup-form', {
  props:['name','surname','email','password','fn'],
  template: `

  <div class="col-3">
    <h1>Registrati</h1>
    <div class="form-group">
      <label >Name</label>
      <input v-model='name.name' type="text" class="form-control" placeholder="Enter name">
    </div>
    <div class="form-group">
      <label >Surname</label>
      <input v-model='surname.surname' type="text" class="form-control" placeholder="Enter surname">
    </div>
    <div class="form-group">
      <label >Email address</label>
      <input v-model='email.title' type="email" class="form-control" placeholder="Enter email">
    </div>
    <div class="form-group">
      <label >Password</label>
      <input v-model='password.password' type="password" class="form-control" placeholder="Password">
    </div>
    <button @click='fn' class="btn btn-primary">Submit</button>
  </div>
  `
} )

Vue.component('chat', {
  props:['texts','fn1','fn2','message','input'],
  template:`
  <div class="container">
    <div class="row chat-window col-xs-5 col-md-5" id="chat_window_1" style="margin-left:10px;">
        <div class="col-xs-12 col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading top-bar">
                    <div class="col-md-8 col-xs-8">
                        <h3 class="panel-title"><span class="glyphicon glyphicon-comment"></span> Chat </h3>
                    </div>
                    <div class="row col-12">
                      <label class="col-1">id:</label>
                      <input class="col-7" type="text" v-model="input.id"></input>
                      <button class="btn primary col-3" @click="fn1">Update</button>
                    </div>
                </div>
                <div class="panel-body msg_container_base">
                    <div class="row msg_container base_sent">
                        <div class="col-md-10 col-xs-10">
                            <div class="messages msg_sent" v-for="text in texts.comments">
                                <p>{{text.name}}</p>
                                <p>{{text.text}}</p>
                                <p>{{text.timeStamp}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel-footer">
                    <div class="input-group">
                        <input v-model="message.message" id="btn-input" type="text" class="form-control input-sm chat_input" placeholder="Scrivi il tuo messaggio qui..." />
                        <span class="input-group-btn">
                        <button @click="fn2" class="btn btn-primary btn-sm" id="btn-chat">invia</button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    `
} )
