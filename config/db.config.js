module.exports = {
  HOST:'localhost',
  USER:'root',
  PASSWORD:'anugrah17',
  DB:'restful_api_bezcode_sequelize',
  dialect : 'mysql',
  pool:{
    max:5,
    min:0,
    acquire:30000,
    idle:10000
  }
};