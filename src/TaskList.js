import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs"
import styled from "styled-components"

const Gap = styled.div`
	width: 100%;
	padding: 1rem;
`
const GapVertical = styled.div`
	width: 100%;
	padding: 1rem 0;
`

const GapLeft = styled.div`
	padding: 0 0 0 1rem;
`

const Title = styled.h2`
	display: flex;
	width: 100%;
	flex-wrap: wrap;
	justify-content: flex-start;
	border-bottom: 1px solid #2c3035;
	margin: 0;
	padding-bottom: 1rem;
	color: #fff;
	font-size: 1rem;
`
const MiniTitle = styled.div`
	font-size: 1rem;
	color: #fff;
	font-weight: normal;
	margin-bottom: 0;
`
const CallAction = styled.span`
	display: block;
	padding: 3px;
	font-size: 0.875rem;
	color: #fff;
	cursor: pointer;
`

const Text = styled.p`
	font-size: 0.875rem;
	color: #fff;
	font-weight: normal;
	margin: 0;
	text-align: left;
`

const Box = styled.div`
	display: flex;
	width: 100%;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #2c3035;
	padding: 1em 0;
`
const Actions = styled.div`
	display: flex;
	justify-content: flex-end;
	padding: 1em 0;
`

const Content = styled.div`
	background: #454e5f;
	display: flex;
	width: 100%;
	flex-wrap: wrap;
	border-radius: 5px;
`
const TextThrough = styled.div`
	font-size: 0.875rem;
	font-weight: normal;
	margin-bottom: 0;
	text-align: left;

	text-decoration: line-through;
	color: rgb(240, 98, 146);
`

export const TaskList = ({ todos = [], taskEdit, taskDelete }) => {
	return (
		<Content>
			<Gap>
				<Title>Lista de tarefas:</Title>
				{todos.length === 0 && (<GapVertical><Text>Não há tarefas!</Text></GapVertical>)}
				{todos.map((todo) => (
					<Box className="todo" key={todo.id}>
						<MiniTitle>
							{todo.done ? (
								<TextThrough>{todo.title}</TextThrough>
							) : (
								<Text>{todo.title}</Text>
							)}
						</MiniTitle>

						{todo.done ? (
							<TextThrough>{todo.time}</TextThrough>
						) : (
							<Text>{todo.time}</Text>
						)}

						<Actions>
							<GapLeft>
								<CallAction onClick={() => taskEdit(todo)}>
									{!todo.done ? <BsBookmarkCheck /> : <BsBookmarkCheckFill />}
								</CallAction>
							</GapLeft>

							<GapLeft>
								<CallAction>
									<BsTrash onClick={() => taskDelete(todo.id)} />
								</CallAction>
							</GapLeft>
						</Actions>
					</Box>
				))}
			</Gap>
		</Content>
	)
}
