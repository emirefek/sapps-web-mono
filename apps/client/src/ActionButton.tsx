import React from 'react'
import { Container, Button, Link, lightColors, darkColors } from 'react-floating-action-button'

export default function FAB(){
  return (
      <Container>
          <Button
              icon="fas fa-plus"
              rotate={true}
              onClick={() => alert('FAB Rocks!')} 
              tooltip="The big plus button!"
              styles={{backgroundColor: darkColors.lighterRed, color: lightColors.white}}    
          />
      </Container>
  )
}