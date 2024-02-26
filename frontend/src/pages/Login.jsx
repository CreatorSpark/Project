import React, { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"
import {
	Container,
	Row,
	Col,
	Form,
	FormGroup,
	Label,
	Input,
	Button,
	NavLink,
} from "reactstrap"

const Login = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		const { email, password } = e.target.elements

		const user = {
			email: email.value,
			password: password.value,
		}

		if (Object.values(user).some((el) => el === "")) {
			setError("Please fill all fields")
			return
		}

		try {
			setLoading(true)

			const res = await fetch("http://localhost:5000/api/v1/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			})
			const data = await res.json()

			if (data.success) {
				navigate("/")
				toast.success(data?.message)
			} else {
				toast.error(data?.message)
				setError(data?.message)
			}
			setLoading(false)
		} catch (err) {
			console.log(err)
			setError(err.message)
			toast.error(err.message)
			setLoading(false)
		}
	}

	return (
		<Container>
			<Row className="mt-5">
				<Col md={{ size: 6, offset: 3 }}>
					<Form onSubmit={handleSubmit}>
						<FormGroup>
							<Label for="email">Email</Label>
							<Input
								type="email"
								name="email"
								id="email"
								placeholder="Enter your email"
								required
							/>
						</FormGroup>
						<FormGroup>
							<Label for="password">Password</Label>
							<Input
								type={showPassword ? "text" : "password"}
								name="password"
								id="password"
								placeholder="Enter your password"
								required
							/>
							<Button
								type="button"
								color="link"
								className="password-toggle"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? "Hide Password" : "Show Password"}
							</Button>
						</FormGroup>
						{error && <div className="text-danger">{error}</div>}
						<Button color="primary" block>
							Login
						</Button>
					</Form>
					<div className="mt-3">
						<NavLink href="/forgot-password">Forgot Password?</NavLink>
					</div>
					<div className="mt-2 text-blue-600">
						<NavLink href="/register">
							Don't have an account? Sign up here
						</NavLink>
					</div>
				</Col>
			</Row>
		</Container>
	)
}

export default Login
