import path from 'path';

export const getPublicDirPath = () => {
  let res = path.resolve();
  if (res.substring(res.length - 3) === 'src') res = res.slice(0, res.length - 4);
  return `${res}/public`;
};

export const getLocalImagePath = (imageServerPath) => `${getPublicDirPath()}/uploads/${imageServerPath.split('/')[4]}`;
