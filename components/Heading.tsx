import React from 'react'

interface HeadingProps{
  title: string,
  description: string
}

const Heading = ({title, description} : HeadingProps) => {
  return (
    <div>Head</div>
  )
}

export default Heading