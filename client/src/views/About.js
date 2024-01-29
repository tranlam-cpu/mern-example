import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const About = () =>{
	
	
	return (
		<Row className='mt-5'>
			<Col className='text-center'>
				<Button
					variant='primary'
					href='https://www.facebook.com/profile.php?id=100009388788143'
					size='lg'
				>
					contact for me though the facebook!!
				</Button>
			</Col>
		</Row>
	)
}

export default About