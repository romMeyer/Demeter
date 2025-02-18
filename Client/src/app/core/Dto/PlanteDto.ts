import { PlantType } from "./PlantType";

export interface PlanteDto{
    id: number,
    name: String;
    plantType?: PlantType; // id plus tard
    description?: String;
}