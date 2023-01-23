import crypto from 'crypto';

export const randomString = (bytesSize = 32) =>
  crypto.randomBytes(bytesSize).toString('hex');

export const numbersInRangeObject = (begin, end) => {
  if (end < begin) throw Error(`Invalid range because ${end} < ${begin}`);
  let sum = 0;
  let count = 0;
  for (let i = begin; i <= end; i++) {
    sum += i;
    count++;
  }
  return { sum, count };
};

export const extractPrefixedColumns = ({ prefixedObejct, prefix }) => {
  const prefixRexp = new RegExp(`^${prefix}_(.*)`);
  return Object.entries(prefixedObejct).reduce((acc, [key, value]) => {
    const match = key.match(prefixRexp);
    if (match) {
      acc[match[1]] = value;
    }
    return acc;
  }, {});
};
