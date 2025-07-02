import { Request, Response } from "express";

let listaDePet = []

export default class ControllerPet {
    criarPet(req:Request, res:Response) {
        const novoPet = req.body
        listaDePet.push(novoPet)
        return res.status(201).json(novoPet)
    }
}