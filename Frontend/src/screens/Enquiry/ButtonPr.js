import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';

const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#0063cc',
  borderColor: '#0063cc',
  
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#0059BF"),
  backgroundColor: "#0059BF",
  '&:hover': {
    backgroundColor: "#0059BF",
  },
}));

export default function ButtonPr(props) {
  return (
    <Stack spacing={2} direction="row" style={{display:'flex', justifyContent:'flex-end', margin:0, padding:0}}>
      <ColorButton variant="contained" value={props.value} style={{ width:props.width, height:props.height, fontSize:props.fontSize, margin:0, fontWeight:props.fontWeight}}>{props.label}</ColorButton>
    </Stack>
  );
}