const Sequelize = require('sequelize')
const {STRING, UUID, UUIDV4} = Sequelize

const conn = new Sequelize('postgress://localhost/acme_seq_db')
