export interface CreateTaskDto {
  title: string;
  status?: "A faire" | "Terminé";
}