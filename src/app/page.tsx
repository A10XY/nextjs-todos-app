'use client'
import React from 'react'
import "bootstrap/dist/css/bootstrap.css"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup" 
import FormControl from "react-bootstrap/FormControl" 
import ListGroup from "react-bootstrap/ListGroup"

interface Todo {
  id: number,
  value: string
}

export default class Home extends React.Component<{}, { userInput: string, todosList: Todo[] }> {
  constructor(props: any) { 
		super(props); 

		// Setting up state 
		this.state = { 
			userInput: "", 
			todosList: [], 
		}; 
	}

  // Set a user input value 
	updateInput(value: string) { 
		this.setState({ 
			userInput: value, 
		}); 
	}
  
  // Add item if user input in not empty 
	addItem() { 
		if (this.state.userInput !== "") { 
      const todo: Todo = {
        id: Math.random(),
        value: this.state.userInput
      }

			// Update list 
			const list = [...this.state.todosList]; 
			list.push(todo); 

			// reset state 
			this.setState({ 
				todosList: list, 
				userInput: "", 
			}); 
		} else {
			alert("Your ToDo is empty!");
    }
	} 

  // Function to delete item from list use id to delete 
	deleteItem(key: any) { 
		const list = [...this.state.todosList]; 

		// Filter values and leave value which we need to delete 
		const updatedList = list.filter((item) => item.id !== key); 

		// Update list in state 
		this.setState({ 
			todosList: updatedList, 
		}); 
	}

  editItem = (index: any) => { 
    const todos = [...this.state.todosList]; 
    const editedTodo = prompt('Edit the todo:'); 
    if (editedTodo !== null && editedTodo.trim() !== '') { 
      let updatedTodos = [...todos] 
      updatedTodos[index].value = editedTodo 
      this.setState({ 
      todosList: updatedTodos, 
    }); 
    } 
  } 
  
  render() {
    return (
      <main>
      <Container> 
				<Row 
					style={{ 
						display: "flex", 
						justifyContent: "center", 
						alignItems: "center", 
						fontSize: "3rem", 
						fontWeight: "bolder", 
					}} 
				> 
					MY TODO LIST 
				</Row> 

				<hr /> 
				<Row> 
					<Col md={{ span: 6, offset: 3 }}> 
						<InputGroup className="mb-3"> 
							<FormControl 
								placeholder="Write what you wanna do next . . . "
								size="lg"
								value={this.state.userInput} 
								onChange={(item) => 
									this.updateInput(item.target.value) 
								} 
								aria-label="add something"
								aria-describedby="basic-addon2"
                style={{borderRadius: "8px"}}
							/> 
							<InputGroup> 
								<Button 
									variant="dark"
									className="mt-2"
									onClick={() => this.addItem()} 
								> 
									ADD +
								</Button> 
							</InputGroup> 
						</InputGroup> 
					</Col> 
				</Row> 
				<Row> 
					<Col md={{ span: 6, offset: 3 }}> 
						<ListGroup> 
							{/* map over and print items  */}
							{this.state.todosList.map((item, index) => { 
								return ( 
								<div key = {index} > 
									<ListGroup.Item 
										variant="dark"
										action 
										style={{display:"flex", 
												justifyContent: "space-between",
                        borderRadius: "8px",
                        border: "0",
                        color: "black",
                        backgroundColor: "#ffffff",
						            marginBottom: "8px",
						            boxShadow: "1px 1px 3px 1px #f1f1f1"
									  }} 
									  > 
										<p style={{maxWidth: "75%", overflow: "hidden", wordWrap: "break-word"}}>{item.value}</p> 
										<span> 
										<Button style={{marginRight:"10px", color: "red"}} 
										variant = "light"
										onClick={() => this.deleteItem(item.id)}> 
										Delete 
										</Button> 
										<Button style={{color: "black"}}
										variant = "light"
										onClick={() => this.editItem(index)}> 
										Edit 
										</Button> 
										</span> 
									</ListGroup.Item> 
								</div> 
								); 
							})} 
						</ListGroup> 
					</Col> 
				</Row> 
			</Container>
    </main>
    )
  }
}