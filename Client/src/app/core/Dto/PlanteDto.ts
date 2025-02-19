import { PlantType } from "./PlantType";

export interface PlanteDto{
    id: number,
    name: string;
    plantType?: PlantType; // id plus tard
    imageName?: string;
}