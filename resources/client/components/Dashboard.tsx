import { styled } from '@mui/material/styles'
import { Grid, Paper } from '@mui/material'
import React from 'react'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Item>A</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>B</Item>
        </Grid>
      </Grid>
    </div>
  )
}
