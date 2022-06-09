import "./App.css"
import { useState, useEffect } from "react"

import { TaskList } from "./TaskList"

const API = "http://localhost:5000"

function App() {
	const [title, setTitle] = useState("")
	const [time, setTime] = useState("")
	const [todos, setTodos] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const loadData = async () => {
			setLoading(true)

			const res = await fetch(API + "/todos")
				.then((res) => res.json())
				.then((data) => data)
				.catch((err) => console.log(err))

			setLoading(false)

			setTodos(res)
		}
		loadData()
	}, [])

	const handleSubmit = async (e) => {
		e.preventDefault()

		const todo = {
			id: Math.random(),
			title,
			time,
			done: false,
		}
		await fetch(API + "/todos", {
			method: "POST",
			body: JSON.stringify(todo),
			headers: {
				"Content-type": "application/json",
			},
		})
		setTodos((prevState) => [...prevState, todo])

		setTitle("")
		setTime("")
	}
	const handleDelete = async (id) => {
		await fetch(API + "/todos/" + id, {
			method: "DELETE",
		})
		setTodos((prevState) => prevState.filter((todo) => todo.id !== id))
	}

	const handleEdit = async (todo) => {
		todo.done = !todo.done

		const data = await fetch(API + "/todos/" + todo.id, {
			method: "PUT",
			body: JSON.stringify(todo),
			headers: {
				"Content-type": "application/json",
			},
		})
		setTodos((prevState) =>
			prevState.map((t) => (t.id === data.id ? (t = data) : t))
		)
	}

	if (loading) {
		return <p>Caregando....</p>
	}

	return (
		<div className="wrapper">
			<div className="App">
				<div className="todo-header">
					<h1>React Todo</h1>
				</div>
				<div className="form-todo">
					<form onSubmit={handleSubmit}>
						<label htmlFor="title">
							<input
								type="text"
								name="title"
								placeholder="Titulo da tarefa"
								onChange={(e) => setTitle(e.target.value)}
								value={title || ""}
								required
							/>
						</label>
						<label htmlFor="time">
							<input
								type="text"
								name="time"
								placeholder="Tempo estimado (horas)"
								onChange={(e) => setTime(e.target.value)}
								value={time || ""}
								required
							/>
						</label>
						<input type="submit" value="Criar Tarefa" />
					</form>
				</div>
			</div>
			<TaskList todos={todos} taskEdit={handleEdit} taskDelete={handleDelete} />
		</div>
	)
}

export default App
