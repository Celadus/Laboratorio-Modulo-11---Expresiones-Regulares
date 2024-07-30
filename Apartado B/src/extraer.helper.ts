const regex = /<img\ssrc=(?<url>"[^">]+")[^>]+>/gm;

export const urlImagenes = (texto: string) => {
  const listaUrl: string[] = [];
  let resultadoRegex;

  while ((resultadoRegex = regex.exec(texto)) !== null) {
    let { url } = resultadoRegex.groups as any;
    url = url.replace(/^"|"$/g, '');
    url = url.replace(/\.\//, '');
    listaUrl.push(url);
  }

  return listaUrl;
};