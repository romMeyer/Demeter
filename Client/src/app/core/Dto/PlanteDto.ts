import { BesoinSoleil } from "./BesoinSoleil";
import { Famille } from "./Famille";
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
    famille: Famille;
    besoinSoleil: BesoinSoleil;
    frequenceArrosage: number;
    recetteList: RecetteDto[];
}