function getImageBlob(file) {
  const blob = URL.createObjectURL(file);
  return blob;
}

export const generalHelpers = {
  getImageBlob,
};
