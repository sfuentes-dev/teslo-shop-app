import { Box, IconButton, Typography } from '@mui/material';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

interface Props {}

export const ItemCounter = ({}: Props) => {
  return (
    <Box display='flex' alignItems='center'>
      <IconButton>
        <RemoveCircleOutlineOutlinedIcon />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>1</Typography>

      <IconButton>
        <AddCircleOutlineOutlinedIcon />
      </IconButton>
    </Box>
  );
};
