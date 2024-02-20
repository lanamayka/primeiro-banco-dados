import express from 'express';
import { db, firestore } from '../banco_de_dados/firebase';

const app = express();

app.use(express.json())

app.get('/',(req, res) =>{

    res.send('olá, seja bem vindo a minha primeira API')

});
app.post('/formulario', async (req, res) => {

    const nome = req.body.nome;
    const telefone = req.body.telefone;
    const email = req.body.email;
    const descricao = req.body.descricao;

    try{
        const docRef = await firestore.addDoc(firestore.collection(db,"formulario"),
    {
        nome: nome,
        telefone: telefone,
        email: email,
        descricao: descricao,

    })

    res.send( "Resposta enviada com sucesso " + docRef.id);
    }catch (e) {
        console.log("Erro ao enviar resposta", e);
        res.status(500).send(e)
    }
})
app.get('/listarFormulario', async (req, res)=>{
 try {
    const formulario = await firestore.getDocs(firestore.collection(db,'formulario')
    );
    const formularoLista = formulario.docs.map((doc)=>({
        id: doc.id,
        ...doc.data(),
    }));
    
    res.send(formularoLista);
 } catch (e) {
    console.log("Erro ao listar formulario:" + e)

    res.status(500).send("Erro ao listar formulario" + e)
 }
})

app.put('/atualizarformulario/:id', async(req, res)=> {
const id = req.params.id
const nome = req.body.nome

try {
    await firestore.updateDoc(firestore.doc(db,'formulario', id), {
       nome: nome, 
    })
    res.send('formulario Atualizado com sucesso!')
} catch (e) {
    console.log('Erro ao atualizar formulairo' + e )

    res.status(500).send('Erro ao atualizar formulario:' + e)
}
})

app.delete('/deletarformulario/:id', async (req, res) =>{
    const id = req.params.id

    try {
        await firestore.deleteDoc(firestore.doc(db, 'formulario',id))

        res.send('formulario deletado com sucesso!')
    } catch (e) {
        console.log('Erro ao deletar formulario' +e)

        res.status(500).send('Erro ao deletar formulario:' +e)
    }
})

app.listen(3000, function(){
    console.log("servidor rodando na porta http://localhost:3000")
});