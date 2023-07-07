export function toCamelCase(str: string) {
  let result = [];
  let toUpper = false;

  for (let i = 0; i < str.length; i++) {
    let char = str[i];

    if (
      (char >= 'a' && char <= 'z') ||
      (char >= '0' && char <= '9') ||
      (char >= 'A' && char <= 'Z')
    ) {
      if (toUpper && char >= 'a' && char <= 'z') {
        result[i] = char.toUpperCase();
        toUpper = false;
      } else {
        result[i] = char;
      }
    } else {
      toUpper = true;
    }
  }

  return result.join('');
}
