const { Thought } = require("../models")

module.exports = {

  getAll: async function(){
    try {
      return await Thought.find({})
    } catch(err){
      throw new Error(err.message)
    }
  },

  getOne: async function(criteriaObj){
    try {
      return await Thought.findOne(criteriaObj)
    } catch(err){
      throw new Error(err.message)
    }
  },

  getById: async function(id){
    try {
      return await Thought.findById(id)
    } catch(err){
      throw new Error(err.message)
    }
  },

  create: async function(data){
    try {
      return await Thought.create(data)
    } catch(err){
      throw new Error(err.message)
    }
  },

  updateById: async function(id, data){
    try {
      return await Thought.findByIdAndUpdate(
        id, 
        data, 
        { new: true }
      )
    } catch(err){
      throw new Error(err.message)
    }
  },

  deleteById: async function(id){
    try {
      return await Thought.findByIdAndDelete(id)
    } catch(err){
      throw new Error(err.message)
    }
  }

}