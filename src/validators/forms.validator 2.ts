import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import moment from 'moment';
import { esIbanValido } from './iban.validator';
import { EmailValidation } from './email.validator';
import { Generic, Numbers, Strings } from '../utils/utils';

const DATE_FORMAT = ['DD/MM/YYYY'];
const TIME_FORMAT = 'HH:mm';

export class FormsValidation {
  static notEmpty(control: AbstractControl): ValidationErrors | null {
    if (
      Generic.isNullOrUndefined(control.value) ||
      Strings.isEmpty(`${control.value}`) ||
      control.value == 'null'
    ) {
      return { empty: true };
    }
    return null;
  }

  static isNumber(control: AbstractControl): ValidationErrors | null {
    if (
      Generic.isNullOrUndefined(control.value) ||
      Strings.isEmpty(`${control.value}`)
    ) {
      return null;
    }
    if (!Numbers.isNumber(control.value)) {
      return { isNotNumber: true };
    }
    return null;
  }

  static isNotNumber(control: AbstractControl): ValidationErrors | null {
    if (
      Generic.isNullOrUndefined(control.value) ||
      Strings.isEmpty(`${control.value}`)
    ) {
      return null;
    }
    if (!/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g.test(control.value)) {
      return { isNotNumber: true };
    }
    return null;
  }

  static isNumberAndPercent(control: AbstractControl): ValidationErrors | null {
    if (
      Generic.isNullOrUndefined(control.value) ||
      Strings.isEmpty(`${control.value}`)
    ) {
      return null;
    }
    if (!Numbers.isNumber(control.value)) {
      return { isNotNumber: true };
    } else {
      if (Number(control.value) > 100 || Number(control.value) < 0) {
        return { isNotPercent: true };
      }
    }
    return null;
  }

  static isADay(control: AbstractControl): ValidationErrors | null {
    if (
      Generic.isNullOrUndefined(control.value) ||
      Strings.isEmpty(`${control.value}`)
    ) {
      return null;
    }
    if (!Numbers.isNumber(control.value)) {
      return { isNotNumber: true };
    } else {
      if (Number(control.value) > 31 || Number(control.value) < 1) {
        return { isNotDay: true };
      }
    }
    return null;
  }

  static isAMonth(control: AbstractControl): ValidationErrors | null {
    if (
      Generic.isNullOrUndefined(control.value) ||
      Strings.isEmpty(`${control.value}`)
    ) {
      return null;
    }
    if (!Numbers.isNumber(control.value)) {
      return { isNotNumber: true };
    } else {
      if (Number(control.value) > 12 || Number(control.value) < 1) {
        return { isNotMonth: true };
      }
    }
    return null;
  }

  static isAYear(control: AbstractControl): ValidationErrors | null {
    if (
      Generic.isNullOrUndefined(control.value) ||
      Strings.isEmpty(`${control.value}`)
    ) {
      return null;
    }
    if (!Numbers.isNumber(control.value)) {
      return { isNotNumber: true };
    } else {
      if (Number(control.value) > 9000 || Number(control.value) < 1900) {
        return { isNotYear: true };
      }
    }
    return null;
  }

  static isAHour(control: AbstractControl): ValidationErrors | null {
    if (
      Generic.isNullOrUndefined(control.value) ||
      Strings.isEmpty(`${control.value}`)
    ) {
      return null;
    }
    if (!Numbers.isNumber(control.value)) {
      return { isNotNumber: true };
    } else {
      if (Number(control.value) > 23 || Number(control.value) < 0) {
        return { isNotHour: true };
      }
    }
    return null;
  }

  static isAMin(control: AbstractControl): ValidationErrors | null {
    if (
      Generic.isNullOrUndefined(control.value) ||
      Strings.isEmpty(`${control.value}`)
    ) {
      return null;
    }
    if (!Numbers.isNumber(control.value)) {
      return { isNotNumber: true };
    } else {
      if (Number(control.value) > 59 || Number(control.value) < 0) {
        return { isNotMin: true };
      }
    }
    return null;
  }


  static validationEmailDefault(
    control: AbstractControl
  ): ValidationErrors | null {
    if (
      Generic.isNullOrUndefined(control.value) ||
      Strings.isEmpty(control.value)
    ) {
      return null;
    }
    if (!EmailValidation.validationEmailDefault(control.value)) {
      return { invalidEmail: true };
    }
    return null;
  }

  static validationEmail(control: AbstractControl): ValidationErrors | null {
    if (
      Generic.isNullOrUndefined(control.value) ||
      Strings.isEmpty(control.value)
    ) {
      return null;
    }
    if (!EmailValidation.validationEmail(control.value)) {
      return { invalidEmail: true };
    }
    return null;
  }

  // Validacion estandar usada en HTML con type='email'
  static validationEmailW3CStandar(
    control: AbstractControl
  ): ValidationErrors | null {
    if (
      Generic.isNullOrUndefined(control.value) ||
      Strings.isEmpty(control.value)
    ) {
      return null;
    }
    if (!EmailValidation.validationEmailW3CStandar(control.value)) {
      return { invalidEmail: true };
    }
    return null;
  }

  static esIbanValido(control: AbstractControl): ValidationErrors | null {
    if (
      Generic.isNullOrUndefined(control.value) ||
      Strings.isEmpty(control.value)
    ) {
      return null;
    }

    const iban = control.value;
    if (!esIbanValido(iban)) {
      return { invalidIban: true };
    }
    return null;
  }

  static esFechaValida(control: AbstractControl): ValidationErrors | null {
    if (
      Generic.isNullOrUndefined(control.value) ||
      Strings.isEmpty(control.value)
    ) {
      return null;
    }

    const date = control.value;
    if (!moment(date, DATE_FORMAT, true).isValid()) {
      return { invalidDate: true };
    }
    return null;
  }

  static esFechaAnterior(control: AbstractControl): ValidationErrors | null {
    if (
      Generic.isNullOrUndefined(control.value) ||
      Strings.isEmpty(control.value)
    ) {
      return null;
    }

    const date = control.value;
    if (moment(date, DATE_FORMAT, true).isSameOrAfter(moment())) {
      return { dateIsAfterNow: true };
    }
    return null;
  }

  static esFechaPosterior(control: AbstractControl): ValidationErrors | null {
    if (
      Generic.isNullOrUndefined(control.value) ||
      Strings.isEmpty(control.value)
    ) {
      return null;
    }

    const date = control.value;
    if (moment(date, DATE_FORMAT, true).isSameOrBefore(moment())) {
      return { dateIsBeforeNow: true };
    }
    return null;
  }

  static esFechaMayorMenor(
    fechaInicioForm: string,
    fechaFinForm: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (
        Generic.isNullOrUndefined(control.value) ||
        Strings.isEmpty(control.value)
      ) {
        return null;
      }

      const fechaInicio = control.get(fechaInicioForm).value;
      const fechaFin = control.get(fechaFinForm).value;

      if (
        moment(fechaInicio, DATE_FORMAT, true).isAfter(
          moment(fechaFin, DATE_FORMAT, true)
        )
      ) {
        return { [fechaInicioForm]: 'esFechaMayorMenor' };
      }

      return null;
    };
  }

  static esAnioAnterior(control: AbstractControl): ValidationErrors | null {
    if (
      Generic.isNullOrUndefined(control.value) ||
      Strings.isEmpty(control.value)
    ) {
      return null;
    }

    const date = control.value;
    const currentYear = moment().year();
    if (moment(date, DATE_FORMAT, true).year() >= currentYear) {
      return { yearIsNotBeforeNow: true };
    }
    return null;
  }

  static esHoraValida(control: AbstractControl): ValidationErrors | null {
    if (
      Generic.isNullOrUndefined(control.value) ||
      Strings.isEmpty(control.value)
    ) {
      return null;
    }

    const date = control.value;
    if (!moment(date, TIME_FORMAT, true).isValid()) {
      return { invalidTime: true };
    }
    return null;
  }


  static validarMinMenorMax(valorMin: string, valorMax: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (
        Generic.isNullOrUndefined(control.value) ||
        Strings.isEmpty(control.value)
      ) {
        return null;
      }
      const importeMin = control.get(valorMin).value;
      const importeMax = control.get(valorMax).value;

      if (parseInt(importeMin) >= parseInt(importeMax)) {
        return { [valorMin]: 'minMayorMax' };
      }
      return null;
    };
  }

  static validarEntreValores(
    valor: string,
    valorMin: number,
    valorMax: number
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (
        Generic.isNullOrUndefined(control.value) ||
        Strings.isEmpty(control.value)
      ) {
        return null;
      }

      const val = control.get(valor).value;

      if (parseInt(val) < valorMin || parseInt(val) > valorMax) {
        return { [valor]: 'entreValores' };
      }
      return null;
    };
  }

  static validarCcsBoa(ccsvBoa: string, docBoa: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (
        Generic.isNullOrUndefined(control.value) ||
        Strings.isEmpty(control.value)
      ) {
        return null;
      }
      return null;
    };
  }

  static esMayorDeEdad(control: AbstractControl): ValidationErrors | null {
    if (
      Generic.isNullOrUndefined(control.value) ||
      Strings.isEmpty(control.value)
    ) {
      return null;
    }

    const date = control.value;

    var fechaNacimientoArr = date.split('/');
    var fechaNacimiento = new Date(
      fechaNacimientoArr[2],
      fechaNacimientoArr[1] - 1,
      fechaNacimientoArr[0]
    );
    var ageDifMs = Date.now() - fechaNacimiento.getTime();
    var ageDate = new Date(ageDifMs);

    if (Math.abs(ageDate.getUTCFullYear() - 1970) < 18) {
      return { yearIsNotMayorEdad: true };
    }
    return null;
  }
}
