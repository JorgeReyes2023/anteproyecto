/**
 * Utilidades
 */
class Utils {
  /**
   * Convierte recursivamente los BigInt a string para la serialización JSON
   * @param {any} obj - Objeto a convertir
   * @returns {any} Objeto con los BigInt convertidos a string
   */
  static convertBigIntToString(obj) {
    if (obj === null || obj === undefined) {
      return obj;
    }

    if (typeof obj === "bigint") {
      return obj.toString();
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.convertBigIntToString(item));
    }

    return obj;
  }

  /**
   * Convierte un valor a BigInt de manera segura
   * @param {string|number|bigint} value - Valor a convertir
   * @returns {bigint} BigInt
   * @throws {Error} Si la conversión no es posible
   */
  static toBigInt(value) {
    if (typeof value === "bigint") {
      return value;
    }

    if (typeof value === "string" || typeof value === "number") {
      try {
        return BigInt(value);
      } catch (error) {
        throw new Error(
          `No se puede convertir "${value}" a BigInt: ${error.message}`,
        );
      }
    }

    throw new Error(`No se puede convertir ${typeof value} a BigInt`);
  }

  /**
   * Alias para el método principal (retrocompatibilidad)
   * @param {any} obj - Objeto a convertir
   * @returns {any} Objeto con los BigInt convertidos
   */
  static handleIdBigInt(obj) {
    return this.convertBigIntToString(obj);
  }
}

module.exports = { Utils };
