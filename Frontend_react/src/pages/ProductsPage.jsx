import React from 'react'
import Products from '../components/E-Pharmacy/Products/Products'
import { Box } from '@mui/material'
import EpharmacySidebar from '../components/E-Pharmacy/EpharmacySideBar/EpharmacySidebar'

const ProductsPage = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
    {/* EpharmacySidebar on the left with margin-right */}
    <EpharmacySidebar sx={{display: 'flex', flexDirection: 'column', flex: '0 auto', marginRight: '32px'}} /> {/* Increase margin-right to create a larger gap */}

    <Box sx={{display: 'flex', flexDirection: 'column', flex: '1', overflowY: 'auto', marginTop: '10px', marginLeft: '32px'}}>
      <Products />
    </Box>
</Box>
  )
}

export default ProductsPage
