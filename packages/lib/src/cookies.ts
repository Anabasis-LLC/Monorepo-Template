/**
 * parse
 */

export const parse = (cookie: string): Record<string, string> =>
  cookie.split('; ').reduce((collect, current) => {
    const [name, ...value] = current.split('=');
    return { ...collect, [name]: value.join('=') };
  }, {});
