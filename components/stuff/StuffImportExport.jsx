import { FileDownload, UploadFile } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

const StuffImportExport = ({ importData, stuff = {} }) => {
  const [fileDownloadUrl, setFileDownloadUrl] = useState('');
  const doFileDownload = useRef(null);

  useEffect(() => {
    if (fileDownloadUrl !== '') {
      doFileDownload.current.click();
      URL.revokeObjectURL(fileDownloadUrl);
      setFileDownloadUrl('');
    }
  }, [fileDownloadUrl]);

  const handleFileUpload = (e) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      if (!evt?.target?.result) {
        return;
      }
      const { result } = evt.target;
      importData(JSON.parse(result));
    };
    reader.readAsText(file);
  };

  const exportData = () => {
    const data = JSON.stringify(stuff);
    const blob = new Blob([data]);
    const fileDownloadUrl = URL.createObjectURL(blob);
    setFileDownloadUrl(fileDownloadUrl);
  };

  return (
    <div>
      <Button variant="outlined" component="label" startIcon={<UploadFile />} sx={{ margin: '4px' }}>
        Importer
        <input type="file" accept=".json" hidden onChange={handleFileUpload} />
      </Button>
      <Button onClick={exportData} variant="outlined" startIcon={<FileDownload />}>
        Exporter
      </Button>
      <a className="hidden" download="stuff.json" href={fileDownloadUrl} ref={doFileDownload}>
        download
      </a>
    </div>
  );
};

export default StuffImportExport;
