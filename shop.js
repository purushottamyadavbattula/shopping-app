let express=require('express')
const Router = express.Router();
let prod_db=require('./users')
let users=require('./users')

var current_user

Router.post('/logged',(req,res)=>{
    //console.log(req.body)
    var name=req.body.name
    var password=req.body.password
    var find_flag=0
    //console.log(users.arr)
    i=0
    var length=users.arr.length
    while(i<length){
        //console.log(users.arr[i])
        var obj=users.arr[i]
        if(obj.name==name){
            if(obj.password==password)
            {
                find_flag=1
                break
            }
        }
        i=i+1
    }
    if(find_flag==1){
        //console.log(prod_db.products)
        //res.render('users',{arr:users.arr,sngl:users.arr[parseInt(0)]})
        current_user=obj
        res.render('shop_page',{arr:prod_db.products,user:obj})
    }
    else{
        
        res.redirect('/')
    }
    //console.log('hai')
})

Router.post('/products',(req,res)=>{
    //console.log('/products',current_user)
    //console.log(current_user,prod_db.products)
    res.render('shop_page',{arr:prod_db.products,user:current_user})
})

Router.post('/edtproducts',(req,res)=>{
    //console.log(current_user)
    res.render('edt_pro',{arr:prod_db.products,user:current_user})
})

Router.post('/proddel',(req,res)=>{
    var id=req.body.delindex
    i=0
    while(i<prod_db.products.length){
        if(prod_db.products[i].id==id)
        {
            prod_db.products.splice(i,1)
            break
        }
        i=i+1
    }
    res.render('edt_pro',{arr:prod_db.products,user:current_user})

})

Router.post('/prodedt',(req,res)=>{
    var id=parseInt(req.body.id)
    console.log(req.body)
    var flag=0
    i=0
    while(i<prod_db.products.length){
        if(prod_db.products[i].id==id)
        {
            flag=1
            prod_db.products[i].name=req.body.pname
            prod_db.products[i].link=req.body.link
            prod_db.products[i].pcost=req.body.pcost
            //console.log(req.body,prod_db.products[i])
        }
        i=i+1
    }
    if(flag==0){
        var obj=req.body
        obj.puser=current_user.id
        //console.log('obj',obj)
        prod_db.products.push(obj)
    }
    res.render('edt_pro',{arr:prod_db.products,user:current_user})
})
Router.post('/addproducts')

exports.Router = Router;