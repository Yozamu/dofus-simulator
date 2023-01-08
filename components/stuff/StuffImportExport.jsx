import { FileDownload, UploadFile } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { generateDownloadURL, handleFileUpload } from '../../helpers/files';

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

  const exportData = () => {
    setFileDownloadUrl(generateDownloadURL(stuff));
  };

  return (
    <div>
      <Button variant="outlined" component="label" startIcon={<UploadFile />} sx={{ margin: '4px' }}>
        Importer
        <input type="file" accept=".json" hidden onChange={(e) => handleFileUpload(e, importData)} />
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
