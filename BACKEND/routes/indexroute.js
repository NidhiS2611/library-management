const express = require('express')
const router = express.Router()
const bookmodel = require('../model/bookmodel')
const{getallbooks} = require('../controllers/bookcontroller')
const authmiddle = require('../middleware/authmiddle')
const { authroll } = require('../middleware/authroll')

router.get('/getallbooks',getallbooks)

router.get('/search', async (req, res) => {
  try {
    const search = req.query.search || "";

    const books = await bookmodel.find({
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ]
    });
      if(!books){
        return res.status(404).json({message:'no books found'})
      }
    
        res.json({ filterbooks: books });
        
        

  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }

})


module.exports = router