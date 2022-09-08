import { Request, Response } from "express";
import { roomRepository } from "../repositories/roomRepository";

export class RoomController{
    async create(req: Request, res: Response){
        const {name, description} = req.body

        try{
            const newRoom = roomRepository.create({name, description})

            await roomRepository.save(newRoom)

            return res.status(201).json(newRoom)

        }catch(e){
            console.log(e)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
}