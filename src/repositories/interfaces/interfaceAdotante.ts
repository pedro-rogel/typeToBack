import AdotanteEntity from "../../entities/adotanteEntity";

export default interface IntercadeAdotande {
    listarAdotande(): Promise<Array<AdotanteEntity>> | Array<AdotanteEntity>
    adotandePorId(id:number): Promise<AdotanteEntity | null> | AdotanteEntity
    criarAdotante(adotande: AdotanteEntity): Promise<void> | void
    atualizarAdotante(id:number, adotande:AdotanteEntity): Promise<{success: boolean; message?: string}> | void
    deletarAdotante(id:number): Promise<{success: boolean; message?: string}>
    
}