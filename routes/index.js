var express = require('express');
var router = express.Router();
var Equipe = require("../models/Equipe");
var Ocorrencia = require('../models/Ocorrencia');
var User = require('../models/User');
var cors = require('cors');
/* GET home page. */
router.options('*', cors());
router.post('/login', cors(), function (req, res, next) {
  let jsondoreq = req.body;
  let clausulaWhere = { where: { matricula: jsondoreq.matricula, senha: jsondoreq.senha } };
  User.findOne(clausulaWhere).then(rows => {
    if (!rows) {
      console.log("entrou no !rows");
      res.json({ erro: "Matrícula ou senha não encontrados" });
    } else {
      let jsonderesposta = {
        matricula: rows.matricula,
        postograd: rows.postograd,
        nomedeguerra: rows.nomedeguerra,
        perfil: rows.perfil,
        unidade: rows.unidade,
        nomecompleto: rows.nomecompleto,
        isAuthenticated: true
      }
      res.json(jsonderesposta);
    }
  }).catch(e=>{
    console.log(e)
    res.status(500).send({erro: "erro no user find one da API"})
  });
});

router.get('/dadoshome', function (req, res, next) {
  let estrutura = { disponiveis: undefined, ocupadas: undefined, ocorrenciaspendentes: undefined, ematendimento: undefined };
  async function findEverything() {
    estrutura.disponiveis = await Equipe.findAll({ where: { status: "disponivel" } });
    estrutura.ocupadas = await Equipe.findAll({ where: { status: "ocupada" } });
    estrutura.ocorrenciaspendentes = await Ocorrencia.findAll({ where: { status: "pendente" } });
    estrutura.ematendimento = await Ocorrencia.findAll({ where: { status: "em atendimento" } });
    res.json(estrutura);
  }
  findEverything();
});
router.get('/equipes/:status', function (req, res, next) {
  let {status} = req.params;
  console.log(typeof(status));
  Equipe.findAll({ where: { status: status } }).then((rows) => {
    if (!rows) {
      res.send("<h1>Nenhuma equipe encontrada na tabela</h1>");
    } else {
      res.send({ rows });
    }
  }).catch((erro) => {
    console.log("deu erro no findAll de equipe: " + erro);
    res.json({ lista_de_erros: erro });
  });
});
router.get('/equipe/:viatura', function (req, res, next) {
  let {viatura} = req.params;
  Equipe.findAll({ where: { viatura: viatura } }).then((rows) => {
    if (!rows) {
      res.send("<h1>Nenhuma equipe encontrada na tabela</h1>");
    } else {
      res.send({ rows });
    }
  }).catch((erro) => {
    console.log("deu erro no get de equipe/:viatura: " + erro);
    res.json({ lista_de_erros: erro });
  });
});

router.post('/equipes', function (req, res, next) {
  let { viatura, comandante, motorista, patrulheiro1, patrulheiro2, status } = req.body;
  Equipe.create({ viatura, comandante, motorista, patrulheiro1, patrulheiro2, status }).then(retorno => { 
    res.json(retorno) 
  }).catch(error=>{
    let obj = error;
    console.log(obj.errors[0]);
    res.send({erro: obj.errors[0].message});
  });
});

router.delete('/equipes', function (req, res, next) {
  let { viatura } = req.body;
  Equipe.destroy({where: {viatura}}).then(retorno => { 
    res.json(retorno) 
  }).catch(error=>res.json(error));
});
router.get('/statusequipe', function (req, res, next) {
  let { viatura, status } = req.query;
  console.log("viatura retirada do query: "+viatura + " " + status);
  Equipe.update({ status }, {where:{viatura}}).then(retorno => { 
    res.json(retorno) 
  }).catch(error=>res.json(error));
});
router.put('/equipes', function (req, res, next) {
  let { viatura, comandante, motorista, patrulheiro1, patrulheiro2, status } = req.body;
  Equipe.update({comandante, motorista, patrulheiro1, patrulheiro2, status }, {where:{viatura}}).then(retorno => { 
    res.json(retorno) 
  }).catch(error=>res.json(error));
});

router.get('/ocorrenciaspendentes', function(req,res,next){
  Ocorrencia.findAll({where:{status: "pendente"}}).then((rows) => {
    if (!rows) {
      res.json({erro: "Nenhuma ocorrencia encontrada no banco de dados"});
    } else {
      res.send({ rows });
    }
  }).catch((erro) => {
    console.log("deu erro no findAll de ocorrencia: " + erro);
    res.json({ lista_de_erros: erro });
  });
});
router.get('/ocorrenciasematendimento', function(req,res,next){
  Ocorrencia.findAll({where:{status: "em atendimento"}}).then((rows) => {
    if (!rows) {
      res.json({erro: "Nenhuma ocorrencia encontrada no banco de dados"});
    } else {
      res.send({ rows });
    }
  }).catch((erro) => {
    console.log("deu erro no findAll de ocorrencia: " + erro);
    res.json({ lista_de_erros: erro });
  });
});
router.get('/ocorrenciasconcluidas', function(req,res,next){
  Ocorrencia.findAll({where:{status: "concluida"}}).then((rows) => {
    if (!rows) {
      res.json({erro: "Nenhuma ocorrencia encontrada no banco de dados"});
    } else {
      res.send({ rows });
    }
  }).catch((erro) => {
    console.log("deu erro no findAll de oco concluidas: " + erro);
    res.json({ lista_de_erros: erro });
  });
});
router.get('/ocorrencia/:despacho', function(req,res,next){
  let {despacho} = req.params;
  let despachoconvertidopraint = parseInt(despacho);
  console.log(typeof despachoconvertidopraint);
  console.log(despachoconvertidopraint);
  Ocorrencia.findOne({where:{despacho: despachoconvertidopraint}}).then(rows=> {
    console.log(rows);
    res.json(rows);
  }).catch(erro =>{
    console.log(erro);
  });
  
});
router.post('/ocorrencias', function (req, res, next) {
  let {fato, equipe, endereco, solicitante, vitima, despachante_responsavel, descricao, status} = req.body;
  let ocorrencia = {fato, equipe, endereco, solicitante, vitima, despachante_responsavel, descricao, status};
  Ocorrencia.create(ocorrencia).then(ocorrenciacriada =>{
    res.json(ocorrenciacriada);
  }).catch(error=>res.json(error));
});
router.delete('/ocorrencias', async function(req,res,next){
  try {    
  let {despacho} = req.body;
  let viaturapraliberar;
  let oco = await(Ocorrencia.findOne({where:{despacho}}));
  viaturapraliberar = oco.equipe;
  Ocorrencia.destroy({where: {despacho}}).then(resultado=>{
    Equipe.update({status: "disponivel"}, {where: {viatura: viaturapraliberar}});
    res.json(resultado);
  });
  } catch (error) {
    res.json(error)
  }
});

router.put('/ocorrencias', function (req, res, next) {
  let {despacho, fato, equipe, endereco, solicitante, vitima, despachante_responsavel, descricao, status} = req.body;
  let ocorrencia = {fato, equipe, endereco, solicitante, vitima, despachante_responsavel, descricao, status};
  Ocorrencia.update(ocorrencia, {where:{despacho}}).then(ocorrenciaatualizada =>{
    res.json(ocorrenciaatualizada);
  }).catch(error=>res.json(error));
});

module.exports = router;
