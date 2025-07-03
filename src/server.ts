
import { Server } from 'http';
import app from './app'
import mongoose from 'mongoose';
let server: Server;
const PORT = 5000;

async function main() {
  try {
    await mongoose.connect(
      'mongodb+srv://L3A3:L3A3@cluster0.zsn3kat.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    );
    console.log('connected to Mongodb using mongoose');

    server = app.listen(PORT, () => {
      console.log(`app is listening on port ${PORT}`);
    })

    
  } catch (error) {
    console.log(error);
  }
}

main()