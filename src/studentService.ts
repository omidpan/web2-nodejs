import db from './db';

export type Student={
    id?:number, //auto increment in db
    first_name:string,
    last_name:string,
    year_of_admission:number,
    discipline: string,
    gender: string

}
export async function getStudents(){
   const [rows] = await db.query("SELECT * FROM students"); 
   return rows;
}





