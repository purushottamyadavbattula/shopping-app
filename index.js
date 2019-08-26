let http=require('http')
let express=require('express')
let users=require('./users')
//let popup = require('popups');
const bodyParser = require('body-parser');
app=express()

app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');
app.set('views', 'html_ejs');

app.use('/register',(req,res)=>{
    res.render('register',{})
})

app.post('/detailsfill',(req,res)=>{
    var obj=req.body
    //console.log(req.body)
    obj.id=users.arr.length
    //obj.set('id',users.arr.length-1)
    users.arr.push(obj)
    console.log(req.body)
    res.redirect('/login')
})




app.post('/getusers',(req,res)=>{
    if(req.body.name==users.admin.name){
        if(req.body.password==users.admin.password){
            res.render('users',{arr:users.arr,sngl:users.arr[0]})
        }
        else{
            res.redirect('/users')
        }
    }
    else{
    }
})

app.use('/users',(req,res)=>{
    res.render('users_find',{})
})


let shop=require('./shop')
app.use(shop.Router)

app.post('/del',(req,res)=>{
    //console.log(req.body)
    var id=parseInt(req.body.delindex)
    var i=0
    while(i<users.arr.length){
        if(users.arr[i].id==id)
        {
            users.arr.splice(i,1)
        }
        i=i+1
    }
    res.render('users',{arr:users.arr,sngl:users.arr[parseInt(0)]})
})

app.post('/edt',(req,res)=>{
    var ele=users.arr[parseInt(req.body.id)]
    ele.name=req.body.name
    ele.password=req.body.password
    users.arr[parseInt(req.body.id)]=ele
    console.log(ele)
    res.render('users',{arr:users.arr,sngl:users.arr[parseInt(0)]})
})
app.post('/snguser',(req,res)=>{
    res.render('users',{arr:users.arr,sngl:users.arr[parseInt(req.body.id)]})
})

app.use('/buy',(req,res)=>{
    res.render('buy',{})
})

app.use('/',(req,res)=>{
    res.render('log_in',{})
    /*var obj={
        name:'hai',
        age:'10'
    }*/
    //users.arr.push(obj)
    //console.log(users.arr[0].name)

})

server=http.createServer(app)
server.listen(5011)