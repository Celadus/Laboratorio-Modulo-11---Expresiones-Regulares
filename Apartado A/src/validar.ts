import * as ibantools from "ibantools";
import { Banco, IbanInfo } from "./validar.model";

export const estaBienFormadoElIban = (iban: string): boolean => {
  const patron =
    /^[A-Z]{2}\d{2}(\s|-)?\d{4}(\s|-)?\d{4}(\s|-)?\d{2}(\s|-)?\d{10}$/;

  return patron.test(iban);
};

export const esElIbanValido = (iban: string): boolean => {
  const numeroLimpio = iban.replace(/[\s-]/g, "");
  return ibantools.isValidIBAN(numeroLimpio);
};

export const extraerInfoIban = (iban: string): IbanInfo | void => {
  const patron =
    /^[A-Z]{2}\d{2}(\s|-)?(?<nombreBanco>\d{4})(\s|-)?(?<sucursal>\d{4})(\s|-)?(?<digitoControl>\d{2})(\s|-)?(?<numeroCuenta>\d{10})$/;

  const coincidencia = patron.exec(iban);

  if (coincidencia) {
    const { nombreBanco, sucursal, digitoControl, numeroCuenta } =
      coincidencia.groups as any;

    const ibanInfo: IbanInfo = {
      nombreBanco,
      sucursal,
      digitoControl,
      numeroCuenta,
    };
    return ibanInfo;
  } else {
    return console.error("El IBAN no es válido");
  }
};

export const extraerNombreBanco = (
  codigoBanco: string,
  bancos: Banco[]
): string | void => {
  const banco = bancos.find((banco) => codigoBanco === banco.codigo);

  return banco
    ? banco.nombre
    : console.error("No se ha encontrado ningún banco");
};

export const infoIbanConNombreBanco = (
  iban: string,
  bancos: Banco[]
): IbanInfo | void => {
  if (!estaBienFormadoElIban(iban)) {
    return console.error("El IBAN no está bien formado");
  }

  if (!esElIbanValido(iban)) {
    return console.error("El IBAN no es válido");
  }

  const infoIban = extraerInfoIban(iban);
  if (!infoIban) {
    return console.error("El IBAN no es válido");
  }

  const nombreBanco = extraerNombreBanco(infoIban.nombreBanco, bancos);
  if (!nombreBanco) {
    return console.error("El código del banco no es válido");
  }

  return {
    ...infoIban,
    nombreBanco,
  };
};
