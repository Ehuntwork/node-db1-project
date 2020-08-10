const express = require('express');
const db = require("../data/dbConfig"); 
const router = express.Router();

router.get('/', (req, res)=>{
    db.select("*")
    .from("accounts")
    .then(accounts=>{
        res.status(200).json({data: accounts})
    })
    .catch(err=>{
        res.status(500).json({err:err})
    })
})

router.post('/', (req, res)=>{
    db("accounts")
    .insert(req.body)
    .returning("id") // for postgres
    .then(accounts=>{
        res.status(201).json({data: accounts})
    })
    .catch(err=>{
        res.status(500).json({err:err})
    })
})

router.put('/:id', (req, res)=>{
    db("accounts")
    .where({id: req.params.id})
    .update(req.body)
    .then(accounts=>{
        if(accounts){
            res.status(200).json({message: "update success"})
        }else{
            res.status(404).json({message: "id not valid"})
        }
    })
    .catch(err=>{
        res.status(500).json({err:err})
    })
})

router.delete('/:id', (req, res)=>{
    db("accounts")
    .where({id: req.params.id})
    .delete()
    .then(accounts=>{
        if(accounts){
            res.status(200).json({message: "delete success"})
        }else{
            res.status(404).json({message: "id not valid"})
        }
    })
    .catch(err=>{
        res.status(500).json({err:err})
    })
})


module.exports = router;