import express from 'express';
import { db, firestore } from '../banco_de_dados/firebase';

const app = express();

app.get('/',(req, res) =>{
    res.send('olá, seja bem vindo a minha primeira API')
})

app.listen(3000, function(){
    console.log("servidor rodando na porta http://localhost:3000")
});

app.post('/usuario', async (req, res) => {
    const usuario = req.body.nome 

    try{
        const docRef = await firestore.addDoc(firestore.collection(db,'usuarios'),{
        nome: nome,
    })

    res.send(docRef.id)
    }catch (e) {
        console.log(e)
        res.status(500).send(e)
        
    }
})
