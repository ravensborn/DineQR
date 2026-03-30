import { Link } from 'react-router';
import { Button, Result } from 'antd';

export default function NotFound() {
	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
			<Result
				status="404"
				title="404"
				subTitle="Page not found"
				extra={
					<Link to="/">
						<Button type="primary">Back to Dashboard</Button>
					</Link>
				}
			/>
		</div>
	);
}
