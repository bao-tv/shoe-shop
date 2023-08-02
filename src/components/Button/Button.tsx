import React from 'react'

type Props = {
    name:string
}

export default function Button({name}: Props) {
  return (
    <div className='button'><button>{name}</button></div>
  )
}