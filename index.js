const express = require('express');
const repoContext = require('./repository/repository-wrapper')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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
app.post('/api/products', (req,res)=>{
    const newProduct = req.body;
    const addedProduct = repoContext.products.createProduct(newProduct);
    return res.send(addedProduct)
})

app.put('/api/products/:id',(req,res)=>{
    const id = req.params.id;
    const productToUpdate = req.body;
    const updatedProduct = repoContext.products.updateProduct(id,productToUpdate);
    return res.send(updatedProduct)
})