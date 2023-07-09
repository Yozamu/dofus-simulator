export const handleFileUpload = (e, importData) => {
  if (!e.target.files) {
    return false;
  }
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (evt) => {
    if (!evt?.target?.result) {
      return false;
    }
    const { result } = evt.target;
    importData(JSON.parse(result));
  };
  reader.readAsText(file);
  return true;
};

export const generateDownloadURL = (jsonData) => {
  const data = JSON.stringify(jsonData);
  const blob = new Blob([data]);
  const fileDownloadUrl = URL.createObjectURL(blob);
  return fileDownloadUrl;
};
