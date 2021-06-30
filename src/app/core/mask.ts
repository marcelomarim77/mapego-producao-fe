const patternsAndMasks = {
  cpf: {
    pattern: [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
    regex: /[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}/
  },
  emailRegex: {
    pattern: s => Array.from(s).map(() => /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
  },
  percentage: {
    pattern: [/\d/, /\d/, /\d/]
  },
  cnpj: {
    pattern: [/[0-9]/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/],
    regex: /[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2}/
  },
  date: {
    pattern: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  },
  companyName: {
    pattern: s => Array.from(s).map(() => /^[A-Za-zÀ-ÿ &]*$/)
  },
  text: {
    pattern: s => Array.from(s).map(() => /^[a-zA-Z\u00C0-\u00FF-\s-']*$/i)
  },
  textAndNumbers: {
    pattern: s => Array.from(s).map(() => /^[a-zA-Z0-9\u00C0-\u00FF-\s-']*$/i)
  },
  numbers: {
    pattern: s => Array.from(s).map(() => /[0-9-.\s]/i)
  },
  textOnly: {
    pattern: s => Array.from(s).map(() => /^[a-zA-Z\u00C0-\u00FF-']*$/i)
  },
  numberOnly: {
    pattern: s => Array.from(s).map(() => /[0-9]/i)
  },
  numbeproposalNumberrsTra: {
    pattern: s => Array.from(s).map(() => /^[0-9-']*$/i)
  },
  numbersAndLetters: {
    pattern: s => Array.from(s).map(() => /[0-9a-zA-Z\s°]/i)
  },
  numbersAndLettersOnly: {
    pattern: s => Array.from(s).map(() => /[0-9a-zA-Z]/i)
  },
  cnae: {
    pattern: [/[0-9]/, /\d/, /\d/, /\d/, '-', /\d/, '/', /\d/, /\d/]
  }, 
  bank: {
    pattern: [/[A-Z0-9]/, /[0-9]/, /[0-9]/, /[a-z0-9]/]
  },
  bankCode: {
    pattern: [/\d/, /\d/, /\d/]
  },
  bankDigit: {
    pattern: [/[0-9a-zA-Z]/i, /[0-9a-zA-Z]/i]
  },
  agency: {
    pattern: [/[0-9a-zA-Z]/i, /[0-9a-zA-Z]/i, /[0-9a-zA-Z]/i, /[0-9a-zA-Z]/i, /[0-9a-zA-Z]/i, /[0-9a-zA-Z]/i, /[0-9a-zA-Z]/i, /[0-9a-zA-Z]/i,]
  },
  pabUa: {
    pattern: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  },
  registration: {
    pattern: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  },
  cooperative: {
    pattern: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  },
  hdiAgency: {
    pattern: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  },
  fipeCode: {
    pattern: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /-/, /\d/]
  },
  quotationNumber: {
    pattern: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  },
  chassi: {
    pattern: s => Array.from(s).map(() => /^[a-zA-Z\u00C0-\u00FF-\s-']*$/i)
  },
  cnpjCpf: {
    pattern: (function getMask(rawValue) {
      if (rawValue.length <= 14) {
        return [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
      } else {
        return [/[0-9]/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
      }
    })
  },
  currency: {
    pattern: (function getMask() {
      const dollarSign = 'R$';
      const emptyString = '';
      const comma = ',';
      const period = '.';
      const minus = '-';
      const minusRegExp = /-/;
      const nonDigitsRegExp = /\D+/g;
      const number = 'number';
      const digitRegExp = /[0-9]/;
      const caretTrap = '[]';

      return function createNumberMask({
        prefix = dollarSign,
        suffix = emptyString,
        includeThousandsSeparator = true,
        thousandsSeparatorSymbol = period,
        allowDecimal = true,
        decimalSymbol = comma,
        decimalLimit = 2,
        requireDecimal = false,
        allowNegative = false,
        allowLeadingZeroes = false,
        integerLimit = null
      } = {}) {
        const prefixLength = (prefix && prefix.length) || 0;
        const suffixLength = (suffix && suffix.length) || 0;
        const thousandsSeparatorSymbolLength =
          (thousandsSeparatorSymbol && thousandsSeparatorSymbol.length) || 0;

        function numberMask(rawValue = emptyString) {
          const rawValueLength = rawValue.length;

          if (
            rawValue === emptyString ||
            (rawValue[0] === prefix[0] && rawValueLength === 1)
          ) {
            return prefix
              .split(emptyString)
              .concat([String(digitRegExp)])
              .concat(suffix.split(emptyString));
          } else if (rawValue === decimalSymbol && allowDecimal) {
            return prefix
              .split(emptyString)
              .concat(['0', decimalSymbol, String(digitRegExp)])
              .concat(suffix.split(emptyString));
          }

          const isNegative = rawValue[0] === minus && allowNegative;
          //If negative remove "-" sign
          if (isNegative) {
            rawValue = rawValue.toString().substr(1);
          }

          const indexOfLastDecimal = rawValue.lastIndexOf(decimalSymbol);
          const hasDecimal = indexOfLastDecimal !== -1;

          let integer;
          let fraction;
          let mask;

          // remove the suffix
          if (rawValue.slice(suffixLength * -1) === suffix) {
            rawValue = rawValue.slice(0, suffixLength * -1);
          }

          if (hasDecimal && (allowDecimal || requireDecimal)) {
            integer = rawValue.slice(
              rawValue.slice(0, prefixLength) === prefix ? prefixLength : 0,
              indexOfLastDecimal
            );

            fraction = rawValue.slice(indexOfLastDecimal + 1, rawValueLength);
            fraction = convertToMask(
              fraction.replace(nonDigitsRegExp, emptyString)
            );
          } else {
            if (rawValue.slice(0, prefixLength) === prefix) {
              integer = rawValue.slice(prefixLength);
            } else {
              integer = rawValue;
            }
          }

          if (integerLimit && typeof integerLimit === number) {
            const thousandsSeparatorRegex =
              thousandsSeparatorSymbol === '.'
                ? '[.]'
                : `${thousandsSeparatorSymbol}`;
            const numberOfThousandSeparators = (
              integer.match(new RegExp(thousandsSeparatorRegex, 'g')) || []
            ).length;

            integer = integer.slice(
              0,
              integerLimit +
              numberOfThousandSeparators * thousandsSeparatorSymbolLength
            );
          }

          integer = integer.replace(nonDigitsRegExp, emptyString);

          if (!allowLeadingZeroes) {
            integer = integer.replace(/^0+(0$|[^0])/, '$1');
          }

          integer = includeThousandsSeparator
            ? addThousandsSeparator(integer, thousandsSeparatorSymbol)
            : integer;

          mask = convertToMask(integer);

          if ((hasDecimal && allowDecimal) || requireDecimal === true) {
            if (rawValue[indexOfLastDecimal - 1] !== decimalSymbol) {
              mask.push(caretTrap);
            }

            mask.push(decimalSymbol, caretTrap);

            if (fraction) {
              if (typeof decimalLimit === number) {
                fraction = fraction.slice(0, decimalLimit);
              }

              mask = mask.concat(fraction);
            }

            if (
              requireDecimal === true &&
              rawValue[indexOfLastDecimal - 1] === decimalSymbol
            ) {
              mask.push(digitRegExp);
            }
          }

          if (prefixLength > 0) {
            mask = prefix.split(emptyString).concat(mask);
          }

          if (isNegative) {
            // If user is entering a negative number, add a mask placeholder spot to attract the caret to it.
            if (mask.length === prefixLength) {
              mask.push(digitRegExp);
            }

            mask = [minusRegExp].concat(mask);
          }

          if (suffix.length > 0) {
            mask = mask.concat(suffix.split(emptyString));
          }

          return mask;
        }

        numberMask.instanceOf = 'createNumberMask';

        return numberMask;
      };

      function convertToMask(strNumber) {
        return strNumber
          .split(emptyString)
          .map(char => (digitRegExp.test(char) ? digitRegExp : char));
      }

      // http://stackoverflow.com/a/10899795/604296
      function addThousandsSeparator(n, thousandsSeparatorSymbol) {
        return n.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparatorSymbol);
      }
    })()()
  },
  currentAccount: {
    pattern: [/[0-9a-zA-Z]/i, /[0-9a-zA-Z]/i, /[0-9a-zA-Z]/i, /[0-9a-zA-Z]/i, /[0-9a-zA-Z]/i, /[0-9a-zA-Z]/i,
      /[0-9a-zA-Z]/i, /[0-9a-zA-Z]/i, /[0-9a-zA-Z]/i, /[0-9a-zA-Z]/i, /[0-9a-zA-Z]/i, /[0-9a-zA-Z]/i, /[0-9a-zA-Z]/i,
      /[0-9a-zA-Z]/i, /[0-9a-zA-Z]/i]
  },
  maxLenghtRelationshipTotal: {
    pattern: [/\d/, /\d/, /\d/]
  },
  maxLengthInsured: {
    pattern: [/\d/, /\d/, /\d/]
  } 
};
export default patternsAndMasks;
