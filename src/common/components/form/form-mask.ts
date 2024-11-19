export const FormMask = {
  number: (v: string) => v.replace(/\D/g, ''),

  noSpace: (v: string) => v.replace(/\s+/g, ''),

  phone: (v: string) => {
    if (v.length <= 14) {
      v = v.toString().replace(/\D/g, '');
      v = v.replace(/^(\d\d)(\d)/g, '($1) $2');
      v = v.replace(/(\d{4})(\d)/, '$1-$2');
      v = v.substring(0, 14);
    } else {
      v = v.toString().replace(/\D/g, '');
      v = v.replace(/^(\d\d)(\d)/g, '($1) $2');
      v = v.replace(/(\d{5})(\d)/, '$1-$2');
      v = v.substring(0, 15);
    }
    return v;
  },

  document: (v: string) => {
    if (v.length <= 11) {
      v = FormMask.cpf(v);
    } else {
      v = FormMask.cnpj(v);
    }
    return v;
  },

  cpf: (v: string) => {
    v = v.replace(/\D/g, '');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})/, '$1-$2');
    v = v.replace(/(-\d{2})\d+?$/, '$1');
    v = v.substring(0, 14);
    return v;
  },

  cnpj: (v: string) => {
    v = v.replace(/\D/g, '');
    v = v.replace(/(\d{2})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d{4})/, '$1/$2');
    v = v.replace(/(\d{4})(\d{1,2})/, '$1-$2');
    v = v.replace(/(-\d{2})\d+?$/, '$1');
    v = v.substring(0, 18);
    return v;
  },

  zip: (v: string) => {
    v = v.replace(/\D/g, '');
    v = v.replace(/^(\d{5})(\d)/, '$1-$2');
    v = v.substring(0, 9);
    return v;
  },

  date: (v: string) => {
    v = v.replace(/\D/g, '');
    v = v.replace(/(\d{2})(\d)/, '$1/$2');
    v = v.replace(/(\d{2})(\d)/, '$1/$2');
    v = v.replace(/(\d{2})(\d{2})$/, '$1$2');
    v = v.substring(0, 10);
    return v;
  },

  dateWithoutDay: (v: string) => {
    v = v.replace(/\D/g, '');
    v = v.replace(/(\d{2})(\d)/, '$1/$2');
    v = v.replace(/(\d{2})(\d{4})$/, '$1/$2');
    v = v.substring(0, 7);
    return v;
  },

  cc: (v: string) => {
    v = v.replace(/\D/g, '');
    v = v.replace(/^(\d{4})(\d)/g, '$1 $2');
    v = v.replace(/^(\d{4})\s(\d{4})(\d)/g, '$1 $2 $3');
    v = v.replace(/^(\d{4})\s(\d{4})\s(\d{4})(\d)/g, '$1 $2 $3 $4');
    return v;
  },

  money: (v: string) => {
    v = v.replace(/\D/g, '');
    if (+v === 0) return '';
    v = (parseFloat(v) / 100).toFixed(2);
    v = new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL',
    }).format(+v);
    return v;
  },
};
