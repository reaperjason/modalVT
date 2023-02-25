export interface Student {
  idestudiante: number,
  nombreestudiante: string,
  gradoadaptacioncurricular1: string,
  discapacidades: Discapacidad[]
}

export interface Discapacidad {
  nombrediscapacidad: string
}
