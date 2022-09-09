import { Request, Response } from "express";
import { roomRepository } from "../repositories/roomRepository";
import { subjectRepository } from "../repositories/subjectRepository";
import { VideoRepository } from "../repositories/VideoRepository";

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
    async createVideo(req: Request, res: Response){
        const {title, url} = req.body
        const {idRoom} = req.params

        try{
            const room = await roomRepository.findOneBy({id: Number(idRoom)})

            if(!room){
                return res.status(404).json({message: 'Aula não existente'})
            }
            const newVideo = VideoRepository.create({title,url,room})

            await VideoRepository.save(newVideo)

            return res.status(201).json(newVideo)
            
        }catch(e){
            console.log(e)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }

    async roomSubject(req: Request, res: Response){
        const { subject_id } = req.body
        const { idRoom } = req.params

        try{
            const room = await roomRepository.findOneBy({id: Number(idRoom)})

            if(!room){
                return res.status(404).json({message: 'Aula não existente'})
            }

            const subject = await subjectRepository.findOneBy({id: Number(subject_id)})

            if (!subject){
                return res.status(404).json({message: 'Disciplina não existente'})
            }

            const roomUpdate = {
                ...room,
                subjects: [subject]
            }

            await roomRepository.save(roomUpdate)

            return res.status(200).send()


        }catch(e){
            console.log(e)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }

    async list(req: Request, res: Response){
        try{
            const rooms = await roomRepository.find({
                relations:{
                    subjects:true,
                    videos: true
                }
            })

            return res.status(200).json(rooms)

        }catch(e){
            console.log(e)
            return res.status(500).json({message: "Internal Server Error"})
        }


    }

}