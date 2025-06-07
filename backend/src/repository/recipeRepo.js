const db=require("../config/db");
const { FieldValue } = require('firebase-admin/firestore');
const collection=db.collection("recipe");

exports.putData=async (data) => {
    const response=await collection.add(data);
    return response;
}

exports.delData=async (id) => {
    await collection.doc(id).delete();
}

exports.getDataByID=async (id) => {
    const response=await collection.doc(id).get();
    return response;
}

exports.getData=async () => {
    const response=await collection.get();
    const data=[];
    response.forEach(doc=>
    {
        data.push({id:doc.id,...doc.data()});
    }
    )
    return data;
}

exports.updatedata=async (data,id) => {
    await collection.doc(id).update(data);
}

exports.addCommand=async (id,cmds,rate) => {
    await collection.doc(id).update({
        cmds:FieldValue.arrayUnion(cmds),
        rate:FieldValue.arrayUnion(rate)
    })
}

exports.addRating=async (id,rate) => {
    await collection.doc(id).update({
        rate:FieldValue.arrayUnion(rate)
    })
}

exports.getDataByUser=async (id) => {
    const response=await collection.where("createdBy","==",id).get();
    const data=[];
    response.forEach(doc=>
    {
        data.push({id:doc.id,...doc.data()});
    }
    )
    return data;
}