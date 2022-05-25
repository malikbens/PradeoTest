import React from 'react'
import { Card, Button } from 'react-bootstrap'

export default function apps(props) {
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src='/apk.png' />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Subtitle>{props.status}</Card.Subtitle>
          <Card.Text>{props.description}</Card.Text>

          <Button href={`/applications/${props.id}`} variant="primary">modifier</Button>

        </Card.Body>
      </Card>
    </div>
  )
}
