const config = require("./dbconfig");
const sql = require("mssql");

async function getAllByName(name) {
  try {
    let pool = await sql.connect(config);
    let pulpits = await pool
      .request()
      .query(`SELECT * FROM ${name.toUpperCase()}`);
    return pulpits.recordsets[0];
  } catch (err) {
    console.log(err);
  }
}
async function post_Faculties(faculty, faculty_name) {
  let pool = await sql.connect(config);
  return await pool
    .request()
    .input("faculty", sql.NVarChar, faculty)
    .input("faculty_name", sql.NVarChar, faculty_name)
    .query(
      "INSERT FACULTY(FACULTY, FACULTY_NAME) values(@faculty , @faculty_name)"
    );
}

async function post_Pulpits(pulpit, pulpit_name, faculty) {
  let pool = await sql.connect(config);
  return await pool
    .request()
    .input("pulpit", sql.NVarChar, pulpit)
    .input("pulpit_name", sql.NVarChar, pulpit_name)
    .input("faculty", sql.NVarChar, faculty)
    .query(
      "INSERT PULPIT(PULPIT, PULPIT_NAME, FACULTY) values(@pulpit , @pulpit_name, @faculty)"
    );
}
async function post_Subjects(subject, subject_name, pulpit) {
  let pool = await sql.connect(config);
  return await pool
    .request()
    .input("subject", sql.NVarChar, subject)
    .input("subject_name", sql.NVarChar, subject_name)
    .input("pulpit", sql.NVarChar, pulpit)
    .query(
      "INSERT SUBJECT(SUBJECT, SUBJECT_NAME, PULPIT) values(@subject , @subject_name, @pulpit)"
    );
}

async function post_Auditoriums_Types(auditorium_type, auditorium_typename) {
  let pool = await sql.connect(config);
  return await pool
    .request()
    .input("auditorium_type", sql.NVarChar, auditorium_type)
    .input("auditorium_typename", sql.NVarChar, auditorium_typename)
    .query(
      "INSERT AUDITORIUM_TYPE(AUDITORIUM_TYPE, AUDITORIUM_TYPENAME) values(@auditorium_type , @auditorium_typename)"
    );
}

async function post_Auditoriums(
  auditorium,
  auditorium_name,
  auditorium_capacity,
  auditorium_type
) {
  let pool = await sql.connect(config);
  return await pool
    .request()
    .input("auditorium", sql.NVarChar, auditorium)
    .input("auditorium_name", sql.NVarChar, auditorium_name)
    .input("auditorium_capacity", sql.Int, auditorium_capacity)
    .input("auditorium_type", sql.NVarChar, auditorium_type)
    .query(
      "INSERT AUDITORIUM(AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_CAPACITY, AUDITORIUM_TYPE)" +
        " values(@auditorium, @auditorium_name, @auditorium_capacity, @auditorium_type)"
    );
}

async function put_Faculties(faculty, faculty_name) {
  let pool = await sql.connect(config);
  return await pool
    .request()
    .input("faculty", sql.NVarChar, faculty)
    .input("faculty_name", sql.NVarChar, faculty_name)
    .query(
      "UPDATE FACULTY SET FACULTY_NAME = @faculty_name WHERE FACULTY = @faculty"
    );
}

async function put_Pulpits(pulpit, pulpit_name, faculty) {
  let pool = await sql.connect(config);
  return await pool
    .request()
    .input("pulpit", sql.NVarChar, pulpit)
    .input("pulpit_name", sql.NVarChar, pulpit_name)
    .input("faculty", sql.NVarChar, faculty)
    .query(
      "UPDATE PULPIT SET PULPIT_NAME = @pulpit_name, FACULTY = @faculty WHERE PULPIT = @pulpit"
    );
}

async function put_Subjects(subject, subject_name, pulpit) {
  let pool = await sql.connect(config);
  return await pool
    .request()
    .input("subject", sql.NVarChar, subject)
    .input("subject_name", sql.NVarChar, subject_name)
    .input("pulpit", sql.NVarChar, pulpit)
    .query(
      "UPDATE SUBJECT SET SUBJECT_NAME = @subject_name, PULPIT = @pulpit WHERE SUBJECT = @subject"
    );
}

async function put_Auditoriums_Types(auditorium_type, auditorium_typename) {
  let pool = await sql.connect(config);
  return await pool
    .request()
    .input("auditorium_type", sql.NVarChar, auditorium_type)
    .input("auditorium_typename", sql.NVarChar, auditorium_typename)
    .query(
      "UPDATE AUDITORIUM_TYPE SET AUDITORIUM_TYPENAME = @auditorium_typename WHERE AUDITORIUM_TYPE = @auditorium_type"
    );
}

async function put_Auditoriums(
  auditorium,
  auditorium_name,
  auditorium_capacity,
  auditorium_type
) {
  let pool = await sql.connect(config);
  return await pool
    .request()
    .input("auditorium", sql.NVarChar, auditorium)
    .input("auditorium_name", sql.NVarChar, auditorium_name)
    .input("auditorium_capacity", sql.Int, auditorium_capacity)
    .input("auditorium_type", sql.NVarChar, auditorium_type)
    .query(
      "UPDATE AUDITORIUM SET AUDITORIUM_NAME = @auditorium_name, AUDITORIUM_CAPACITY = @auditorium_capacity, AUDITORIUM_TYPE =  @auditorium_type" +
        " WHERE AUDITORIUM = @auditorium"
    );
}
async function delete_Faculties(faculty_name) {
  let pool = await sql.connect(config);
  return await pool
    .request()
    .input("faculty_name", sql.NVarChar, faculty_name)
    .query("DELETE FROM FACULTY WHERE FACULTY_NAME = @faculty_name");
}

async function delete_Pulpits(pulpit_name) {
  let pool = await sql.connect(config);
  return await pool
    .request()
    .input("pulpit_name", sql.NVarChar, pulpit_name)
    .query("DELETE FROM PULPIT WHERE PULPIT_NAME = @pulpit_name");
}

async function delete_Subjects(subject_name) {
  let pool = await sql.connect(config);
  return await pool
    .request()
    .input("subject_name", sql.NVarChar, subject_name)
    .query("DELETE FROM SUBJECT WHERE SUBJECT_NAME = @subject_name");
}

async function delete_Auditoriums_Types(auditorium_typename) {
  let pool = await sql.connect(config);
  return await pool
    .request()
    .input("auditorium_typename", sql.NVarChar, auditorium_typename)
    .query(
      "DELETE FROM AUDITORIUM_TYPE WHERE AUDITORIUM_TYPENAME = @auditorium_typename"
    );
}

async function delete_Auditoriums(auditorium_name) {
  let pool = await sql.connect(config);
  return await pool
    .request()
    .input("auditorium_name", sql.NVarChar, auditorium_name)
    .query("DELETE FROM AUDITORIUM WHERE AUDITORIUM_NAME = @auditorium_name");
}

module.exports = {
  getAllByName: getAllByName,
  post_Faculties: post_Faculties,
  post_Pulpits: post_Pulpits,
  post_Subjects: post_Subjects,
  post_Auditoriums_Types: post_Auditoriums_Types,
  post_Auditoriums: post_Auditoriums,
  put_Faculties: put_Faculties,
  put_Pulpits: put_Pulpits,
  put_Subjects: put_Subjects,
  put_Auditoriums_Types: put_Auditoriums_Types,
  put_Auditoriums: put_Auditoriums,
  delete_Faculties: delete_Faculties,
  delete_Pulpits: delete_Pulpits,
  delete_Subjects: delete_Subjects,
  delete_Auditoriums_Types: delete_Auditoriums_Types,
  delete_Auditoriums: delete_Auditoriums,
};
