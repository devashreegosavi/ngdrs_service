const { request } = require('express')
const { response } = require('express')

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ngdrs_ch',
  password: 'postgres',
  port: 5433,
})


const getUsers = (request, response) => {
    pool.query('SELECT user_id,username FROM ngdrstab_mst_user', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getIdentificationsData = (request, response) => {
    pool.query('SELECT identificationtype_id,identificationtype_desc_en FROM ngdrstab_mst_identificationtype', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getallUsersCitizen = (request, response) => {
    pool.query('select user_id,username,office_id,role_id,full_name,mobile_no,email_id from ngdrstab_mst_user_citizen' , (error, results) => {
      if(error){
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getallState = (request,response) => {
    pool.query('select state_id,state_name_en from ngdrstab_conf_admblock1_state order by state_name_en', (error,results) => {
      if(error){
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getDistricts = (request, response) => {
    const stateid = parseInt(request.params.id)
  //console.log(stateid);
    //pool.query('select district_id,district_name_en FROM ngdrstab_conf_admblock3_district WHERE state_id = $1', [stateid], (error, results) => {

    pool.query('select district_id,district_name_en from ngdrstab_conf_admblock3_district WHERE state_id = $1', [stateid], (error,results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getTalukas = (request, response) => {
    const districtid = parseInt(request.params.id)

    pool.query('select taluka_id, taluka_name_en from ngdrstab_conf_admblock5_taluka where district_id = $1', [districtid], (error, result) => {
      if(error){
        throw error
      }
      response.status(200).json(result.rows)
    })
  }


  module.exports = {
    getUsers,
    getIdentificationsData,
    getallUsersCitizen,
    getallState,
    getDistricts,
    getTalukas
}