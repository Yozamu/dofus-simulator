import { FileDownload, UploadFile } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { generateDownloadURL, handleFileUpload } from '../../helpers/files';

const GA_CATEGORY = 'Stuff page';

const StuffImportExport = ({ importData, stuff = {} }) => {
  const [fileDownloadUrl, setFileDownloadUrl] = useState('');
  const doFileDownload = useRef(null);

  useEffect(() => {
    if (fileDownloadUrl !== '') {
      doFileDownload.current.click();
      URL.revokeObjectURL(fileDownloadUrl);
      setFileDownloadUrl('');
      ReactGA.event({ category: GA_CATEGORY, action: 'Export stuff' });
    }
  }, [fileDownloadUrl]);

  const exportData = () => {
    setFileDownloadUrl(generateDownloadURL(stuff));
  };

  const handleImport = (e) => {
    if (handleFileUpload(e, importData)) {
      ReactGA.event({ category: GA_CATEGORY, action: 'Import stuff' });
    }
  };

  return (
    <div>
      <Button variant="outlined" component="label" startIcon={<UploadFile />} sx={{ margin: '4px' }}>
        Importer
        <input type="file" accept=".json" hidden onChange={(e) => handleImport(e)} />
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
