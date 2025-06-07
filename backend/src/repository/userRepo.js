const db=require("../config/db");

const collection=db.collection("users")

exports.putData=async (data) => {
    await collection.add(data);
}

exports.getData=async (username) => {
    const res= await collection.where("username","==",username).get();
    if (res.empty || !res.docs.length) {
        return null;
    }
    const data=res.docs[0];
    return {id:data.id,...data.data()};
}

