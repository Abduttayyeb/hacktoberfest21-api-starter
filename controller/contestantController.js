const Contestant = require('./../model/contestantModel')
const mongodb = require('mongodb')

exports.getStatus = (req,res) => {
    res.status(200).json({
        "status": "OK"
      })
}

exports.getAllContestants = async (req,res) => {
    try{
    let query = Contestant.find()
    query = query.select('-__v')
    query = query.select('-_id')

    const Cont = await query
    res.status(200).json(Cont)
    }catch(err) {
        res.status(404).json({
            status:'fail',
            message:err
        })
    }
}

exports.getContestant = async (req,res) => {
    try{
        let query = Contestant.findOne({'id':req.params.id})
        query = query.select('-__v')
        query = query.select('-_id')

        const Cont = await query
        if(!Cont){
            throw new Error('error')
        }
        res.status(200).json(Cont)
    }
    catch(err) {
        res.status(404).json({
                status:"error"
        })
    }    
}

exports.createContestant = async (req,res) => {
    try{
    const id = new mongodb.ObjectId().toString()
    const body = {"id":id,...req.body,"votes":0}
    const Cont = await Contestant.create(body)

    res.status(201).json({"id":Cont.id})
    }catch(err) {
        res.status(400).json({
            status:'fail',
            message:err
        })
    }
}

exports.updateContestant = async(req,res) => {
    try {
        await Contestant.findOneAndUpdate({'id':req.params.id},req.body)
        res.status(200).json({
            "status": "ok",
          })
    } catch (err) {
        res.status(400).json({
            status:'fail',
            message:err
        })
    }
}

exports.upvoteContestant = async(req,res) => {
    try{
    const cont = await Contestant.findOneAndUpdate({'id':req.params.id},{$inc:{'votes':1}},{new:true})
    res.status(200).json({
        "status": "ok",
        "votes": cont.votes
      })
    }catch(err){
        res.status(400).json({
            status:'fail',
            message:err
        })
    }

}

exports.deleteContestant = async(req,res) => {
    try {
        await Contestant.findOneAndDelete({"id":req.params.id})
        res.status(200).json({
            "status":"ok"
        })
    } catch (err) {
        res.status(400).json({
            status:'fail',
            message:err
        })
    }
}
