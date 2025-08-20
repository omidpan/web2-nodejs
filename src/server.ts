import express, { Request, Response } from "express";
import {promises as fs} from 'fs';// use promises 
import path from 'path';
const app = express();
const PORT = 4001;
// Parse JSON bodies
app.use(express.json());
//an endpoint to retrive json data from items directory
type itemModel={
    itemId:number,
    category:string,
    region:string

}
app.get('/items/:id',async(req:Request,res:Response)=>{
    try{

        const { id } = req.params;
        const itemsDir = path.join(__dirname, '../items');
        const fileName=path.join(itemsDir,`${id}.json`);

        const jsonString= await fs.readFile(fileName,'utf-8');

        const itemJson = JSON.parse(jsonString);

        res.send(itemJson);
    }
    catch (error){
            console.error("Error reading JSON file:", error);
            res.status(500).json({ message: "Error reading file" });
    }
});
app.post("/items", async (req: Request, res: Response) => {
    await manageFile(req,res,201); 
});
app.put("/items",async (req:Request,res:Response)=>{
   await  manageFile(req,res,202)
})
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


async function manageFile(req: Request, res: Response, statusCode: number) {
  try {
    const data: itemModel = req.body;
    // Basic validation
    if (!data.itemId) {
      return res.status(400).json({ error: "itemId is required" });
    }

    // check if item folder exists
    const itemsDir = path.join(__dirname, "../items");

    if (!fs.access(itemsDir)) {
      fs.mkdir(itemsDir);
    }

    const filePath = path.join(itemsDir, `${data.itemId}.json`); // Build file path using itemId

    fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8"); // Save data to JSON file
    let response = {
      message: "Item created successfully",
      file: `${data.itemId}.json`,
      received: data,
    };
    // Send response

    res.status(statusCode).json(response);
  } catch {
    res.status(500).send({ message: " Server error to save the file" });
  }
}
