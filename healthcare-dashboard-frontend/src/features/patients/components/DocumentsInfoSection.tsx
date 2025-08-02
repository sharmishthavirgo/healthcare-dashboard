import React from 'react';
import {
  Typography,
  Grid,
  TextField,
  MenuItem,
  Paper,
  Tooltip,
  IconButton,
  Button,
} from '@mui/material';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { Patient, Document } from '../../../types/patient';

interface DocumentsInfoSectionProps {
  register: UseFormRegister<Patient>;
  errors: FieldErrors<Patient>;
  documentFields: Document[];
  documentTypes: string[];
  watch: UseFormWatch<Patient>;
  removeDocument: (index: number) => void;
}

export const DocumentsInfoSection: React.FC<DocumentsInfoSectionProps> = ({
  register,
  errors,
  documentFields,
  documentTypes,
  watch,
  removeDocument,
}) => {
  return (
    <>
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Documents
      </Typography>
      {documentFields.map((field, index) => (
        <Paper key={field.id} elevation={1} sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid>
              <TextField
                label="Document Name"
                {...register(`documents.${index}.name`)}
                fullWidth
                error={!!errors.documents?.[index]?.name}
                helperText={errors.documents?.[index]?.name?.message}
                sx={{ mb: 1 }}
              />
              <Grid container spacing={2}>
                <Grid>
                  <TextField
                    select
                    label="Document Type"
                    {...register(`documents.${index}.type`)}
                    fullWidth
                    error={!!errors.documents?.[index]?.type}
                    helperText={
                      typeof errors.documents?.[index]?.type === 'object' &&
                      errors.documents?.[index]?.type?.message
                        ? errors.documents?.[index]?.type?.message
                        : undefined
                    }
                  >
                    {documentTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid>
                  <TextField
                    label="Upload Date (YYYY-MM-DD)"
                    {...register(`documents.${index}.uploadDate`)}
                    fullWidth
                    type="date"
                    error={!!errors.documents?.[index]?.uploadDate}
                    helperText={errors.documents?.[index]?.uploadDate?.message}
                  />
                </Grid>
                <Grid>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<DriveFolderUploadIcon />}
                    fullWidth
                    sx={{ mt: 1 }}
                  >
                    Upload File
                    <input
                      type="file"
                      hidden
                      onChange={(e) => {
                        // Handle file here. In a real app, this would involve
                        // uploading to a storage service (S3, GCS) and getting a URL.
                        // For now, this is a placeholder.
                        const file = e.target.files?.[0];
                        if (file) {
                          console.log('Selected file:', file.name, file.size, file.type);
                          // You would typically:
                          // 1. Upload the file
                          // 2. Get the URL and update form state for `documents[index].url`
                          // 3. Update `documents[index].fileSize` and `documents[index].mimeType`
                          // For this demo, we'll just log.
                          alert(`File "${file.name}" selected. (Upload logic not implemented)`);
                        }
                      }}
                    />
                  </Button>
                  {watch(`documents.${index}.name`) && (
                    <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                      File: {watch(`documents.${index}.name`)} (Size:{' '}
                      {watch(`documents.${index}.fileSize`) / 1024} KB)
                    </Typography>
                  )}
                  {errors.documents?.[index]?.url && (
                    <Typography variant="caption" color="error">
                      {errors.documents?.[index]?.url?.message}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid>
              <Tooltip title="Remove Document">
                <IconButton onClick={() => removeDocument(index)} color="error">
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </>
  );
};
