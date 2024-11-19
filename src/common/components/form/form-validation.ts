/* eslint-disable */

const messages = {
  required: 'Campo obrigatório',
  document: 'CPF ou CNPJ inválidos',
  cnpj: 'CNPJ inválido',
  cpf: 'CPF inválido',
  email: 'Email inválido',
  url: 'URL inválida',
};

export const FormValidation = {
  required: (value: string) => !value && messages.required,

  email: (value: string) => {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return !reg.test(value) && messages.email;
  },

  url: (value: string) => {
    const reg =
      /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/;
    return !reg.test(value) && messages.url;
  },

  document: function (value: string) {
    value = value.replace('.', '');
    value = value.replace('.', '');
    value = value.replace('-', '');

    if (value.length <= 11) {
      return this.cpf(value);
    }
    return this.cnpj(value);
  },

  cpf: (value: string) => {
    const isValidCpf = (val: string) => {
      let cpf = value;

      cpf = cpf.replace('.', '');
      cpf = cpf.replace('.', '');
      cpf = cpf.replace('-', '');

      const strCPF = cpf;

      let Soma;
      let Resto;
      Soma = 0;

      if (strCPF === '00000000000') return false;

      for (let i = 1; i <= 9; i++) Soma += parseInt(strCPF.substring(i - 1, i)) * (11 - i);
      Resto = (Soma * 10) % 11;

      if (Resto === 10 || Resto === 11) Resto = 0;
      if (Resto !== parseInt(strCPF.substring(9, 10))) return false;

      Soma = 0;
      for (let i = 1; i <= 10; i++) Soma += parseInt(strCPF.substring(i - 1, i)) * (12 - i);
      Resto = (Soma * 10) % 11;

      if (Resto == 10 || Resto == 11) Resto = 0;
      if (Resto != parseInt(strCPF.substring(10, 11))) return false;

      return true;
    };

    return !isValidCpf(value) && messages.cpf;
  },

  cnpj: (value: string) => {
    const isValidCnpj = (val: string) => {
      if (!value) return true;
      let cnpj = value;

      cnpj = cnpj.replace('/', '');
      cnpj = cnpj.replace('.', '');
      cnpj = cnpj.replace('.', '');
      cnpj = cnpj.replace('-', '');

      let numeros: any;
      let digitos: any;
      let soma: any;
      let i: any;
      let resultado: any;
      let pos: any;
      let tamanho: any;
      let digitos_iguais: any;

      digitos_iguais = 1;

      if (cnpj.length < 14 && cnpj.length < 15) {
        return false;
      }

      for (i = 0; i < cnpj.length - 1; i++) {
        if (cnpj.charAt(i) != cnpj.charAt(i + 1)) {
          digitos_iguais = 0;
          break;
        }
      }

      if (!digitos_iguais) {
        tamanho = cnpj.length - 2;
        numeros = cnpj.substring(0, tamanho);
        digitos = cnpj.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--;
          if (pos < 2) {
            pos = 9;
          }
        }
        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado != digitos.charAt(0)) {
          return false;
        }
        tamanho += 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--;
          if (pos < 2) {
            pos = 9;
          }
        }
        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado != digitos.charAt(1)) {
          return false;
        }
        return true;
      }
      return false;
    };

    return !isValidCnpj(value) && messages.cnpj;
  },
};
