export interface CreateTaskDto {
  title: string;
  desc?: string;
  status?: "A faire" | "Terminé";
}