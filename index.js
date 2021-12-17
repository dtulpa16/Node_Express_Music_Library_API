const express = require('express');
const repoContext = require('./repository/repository-wrapper')
const app = express()

app.listen(3000,function(){
    console.log("Server started. Lestening to port 3000.")
})

app.get('/api/products', (req, res) => {
    const products = repoContext.products.findAllProducts()
    return res.send(products)
    });

app.get('/api/products/:id',(req,res)=>{
    const id = req.params.id;
    const product = repoContext.products.findProductById(id);
    return res.send(product)
})