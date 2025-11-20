import { PlantType } from "./PlantType";
import { RecetteDto } from "./RecetteDto";

export interface PlanteCatalogueDto{
    id: number,
    name: string;
    plantType?: PlantType;
    imageName: string;
}

export interface PlanteDto{
    id: number,
    name: string;
    plantType?: PlantType;
    imageName: string;
    description: string;
    debutRecolte?: string;
    finRecolte?: string;
    famille: string;
    besoinSoleil: string;
    frequenceArrosage: number;
    recetteList: RecetteDto[];
}