import express from 'express';
import { db, firestore } from '../banco_de_dados/firebase';

const app = express();
app.use(express.json())

app.get('/',(req, res) =>{
    res.send('olá, seja bem vindo a minha primeira API')
});
app.post('/usuario', async (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email
    const telefone = req.body.telefone

    try{
        const docRef = await firestore.addDoc(firestore.collection(db,'usuarios'),
    {
        nome: nome,
        email: email,
        telefone: telefone
    })

    res.send( "usuario adicionado com sucesso " + docRef.id);
    }catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})
app.get('/listarUsuarios', async (req, res)=>{
 try {
    const usuarios = await firestore.getDocs(firestore.collection(db,'usuarios'))

    const usuariosLista = usuarios.docs.map((doc)=>({
        id: doc.id,
        ...doc.data(),
    }))
    
    res.send(usuariosLista)
 } catch (e) {
    console.log("Erro ao listar usuarios:" + e)

    res.status(500).send("Erro ao listar usuarios" + e)
 }
})
app.listen(3000, function(){
    console.log("servidor rodando na porta http://localhost:3000")
});