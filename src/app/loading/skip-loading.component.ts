import { HttpContextToken } from "@angular/common/http";

/**
 * Supongamos que tienes un servicio de carga que muestra un spinner durante las solicitudes HTTP.
 * Puedes usar SkipLoading para omitir el spinner para ciertas solicitudes específicas.
 */
export const SkipLoading = new HttpContextToken(
  () => false
)

