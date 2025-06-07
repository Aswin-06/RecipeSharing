const admin = require('firebase-admin');
require("dotenv").config();


admin.initializeApp({
    credential:admin.credential.cert(
        {
            projectId:process.env.id,
            clientEmail:process.env.email,
            privateKey:process.env.key.replace("/\\n/g","\n")
        }
    )
});

const db = admin.firestore();
module.exports=db
