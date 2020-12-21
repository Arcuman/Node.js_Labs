const util = require('util');
const ee = require('events');

let db_data = [
    {id:1,name: 'Ivan', bday:'2001-01-01'},
    {id:2,name: 'Petr', bday:'2001-01-02'},
    {id:3,name: 'Vanya', bday:'2001-01-03'}
]
function select()
{
    return db_data
}
function insert(r)
{
    return db_data.push(r);
}
function update(r)
{
    let oldObject = db_data.find(m => m.id === r.id);
    if(!oldObject){
        throw Error('401 Invalid Request');
    }
    let newNote = db_data.splice(db_data.indexOf(oldObject), 1)[0];
    Object.keys(r).forEach(field => {
        if (newNote[field]) {
            newNote[field] = r[field];
        }
    });
    db_data.push(newNote);
    return newNote;
}

function deleterow(id)
{
    let oldObject = db_data.find(m => m.id.toString() === id);
    if(!oldObject){
        throw Error('401 Invalid Request');
    }
    db_data.splice(db_data.indexOf(oldObject), 1);
    return true;
}
function DB(){
    this.get = ()=>{return select();};
    this.post = (r) =>{insert(r);}
    this.put = (r) =>{
        return update(r);
    }
    this.delete = (r) =>{
        return deleterow(r);
    }
    this.commit = () => { return "Commit"}
}

util.inherits(DB,ee.EventEmitter);

exports.DB = DB;