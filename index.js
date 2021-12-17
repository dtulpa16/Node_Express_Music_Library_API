const express = require('express');
const repoContext = require('./repository/repository-wrapper')
const cors = require('cors');
const {validateProduct} = require('./middleware/products-validation')
const {validateSong} = require("./middleware/music-validation")
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(3000,function(){
    console.log("Server started. Lestening to port 3000.")
})

app.get('/api/products',(req, res) => {
    const products = repoContext.products.findAllProducts()
    return res.send(products)
    });

app.get('/api/products/:id',(req,res)=>{
    const id = req.params.id;
    const product = repoContext.products.findProductById(id);
    return res.send(product)
})
app.post('/api/products', [validateProduct] , (req,res)=>{
    const newProduct = req.body;
    const addedProduct = repoContext.products.createProduct(newProduct);
    return res.send(addedProduct)
})

app.put('/api/products/:id', [validateProduct] ,(req,res)=>{
    const id = req.params.id;
    const productToUpdate = req.body;
    const updatedProduct = repoContext.products.updateProduct(id,productToUpdate);
    return res.send(updatedProduct)
})

app.delete('/api/products/:id', (req,res)=>{
    const id = req.params.id;
    const deletedProduct = repoContext.products.deleteProduct(id);
    return res.send(deletedProduct)
})

app.get('/api/music', (req, res)=>{
    const music = repoContext.songs.findAllSongs()
    return res.send(music)
})

app.get('/api/music/:id',(req,res)=>{
    let id = req.params.id
    let song = repoContext.songs.findSongById(id)
    return res.send(song)
})