import { BesoinSoleil } from "./BesoinSoleilDto";
import { FamilleDto } from "./FamilleDto";
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
    famille: FamilleDto;
    besoinSoleil: BesoinSoleil;
    frequenceArrosage: number;
    recetteList: RecetteDto[];
}