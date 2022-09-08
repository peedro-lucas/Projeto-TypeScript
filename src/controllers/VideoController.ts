import { Request, Response } from "express";
import { VideoRepository } from "../repositories/VideoRepository";

export class VideoController{
    async create(req: Request, res: Response){
        const {title, url} = req.body

        try{
            const newVideo = VideoRepository.create({title, url})

            await VideoRepository.save(newVideo)

            return res.status(201).json(newVideo)

        }catch(e){
            console.log(e)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
}