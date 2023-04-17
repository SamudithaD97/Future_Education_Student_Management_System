import React, { useState, useEffect } from "react";
import "../components/todo.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

import TaskModel from "../components/model.component";
import AppBarComp from "../components/appbar.component";

function Todo() {
  const navigate = useNavigate();

  const initialWork = {
    worknote: "",
    workdate: "",
    worktime: "",
    user: JSON.parse(localStorage.getItem("user"))?.userid || 0,
    worktype: "todo",
  };

  const [open, setOpen] = useState(false);
  const [data, setData] = useState();

  const [work, setWork] = useState(initialWork);

  const [task, setTask] = useState([]);
  const [users, setUsers] = useState([]);
  const [userSuggested, setUserSuggested] = useState([]);
  const [assignedUserList, setAssignedUserList] = useState([]);
  const [typingVal, setTypingVal] = useState("");
  const [state, setState] = useState({
    todo: {
      title: "Todo",
      items: [],
    },
    inprogress: {
      title: "In Progress",
      items: [],
    },
    completed: {
      title: "Completed",
      items: [],
    },
  });

  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      navigate("/login");
    } else {
      getTasks();
      getUsers();
      document.addEventListener("click", () => {
        setUserSuggested([]);
      });
    }
  }, []);

  async function getTasks() {
    await axios
      .get("http://localhost:8080/api/work/read")
      .then((res) => {
        console.log(res.data);
        setTask(res);
        res.data = res.data.filter((item) => {
          return (
            item.user.userid ===
              JSON.parse(localStorage.getItem("user")).userid ||
            item.assignedUsers.some((i) => {
              return (
                i.userid === JSON.parse(localStorage.getItem("user")).userid
              );
            })
          );
        });
        console.log(res.data);
        setState({
          todo: {
            title: "Todo",
            items: res.data.filter((i) => {
              return i.worktype === "todo";
            }),
          },
          inprogress: {
            title: "In Progress",
            items: res.data.filter((i) => {
              return i.worktype === "inprogress";
            }),
          },
          completed: {
            title: "Completed",
            items: res.data.filter((i) => {
              return i.worktype === "completed";
            }),
          },
        });
      })
      .catch((err) => {
        alert("No tasks found");
      });
  }

  async function updateTask(worktype, id) {
    await axios
      .patch(`http://localhost:8080/api/work/updatetype/${id}`, {
        worktype: worktype,
      })
      .then((res) => {
        getTasks();
        console.log("Updated");
      })
      .catch((err) => {
        alert("No tasks found");
      });
  }

  async function getUsers() {
    await axios
      .get(`http://localhost:8080/api/users/all`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        alert("No users found");
      });
  }

  async function createTask(work, assigned) {
    await axios
      .post(`http://localhost:8080/api/work/save`, {
        ...work,
        assignedUsers: assigned,
      })
      .then((res) => {
        getTasks();
        console.log("Added");
        //clear form
        setWork(initialWork);
        setAssignedUserList([]);
      })
      .catch((err) => {
        alert("No tasks found");
      });
  }

  const handleDragEnd = ({ destination, source }) => {
    console.log(" | " + source.draggableId);
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId) {
      return;
    }

    // Creating a copy of item before removing it from state
    const itemCopy = { ...state[source.droppableId].items[source.index] };

    updateTask(destination.droppableId, itemCopy.id);
  };

  const onAssignTyping = (e) => {
    setTypingVal(e.target.value);
    console.log(users);
    console.log(e.target.value);
    if (e.target.value.length > 0)
      setUserSuggested(
        users.filter((user) =>
          user.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    else setUserSuggested([]);
  };

  const addToAssigned = (name, id) => {
    setAssignedUserList([...assignedUserList, { name: name, userid: id }]);
    // setWork({ ...work, assignedUsers: [...id] });
    console.log(assignedUserList);
    setUserSuggested([]);
    setTypingVal("");
  };

  const removeAssigned = (name, id) => {
    setAssignedUserList(assignedUserList.filter((user) => user.userid !== id));
  };

  const addItem = () => {
    var assigned = assignedUserList.map((u) => u.userid);
    // setWork({ ...work, assignedUsers: assignedUserList.map((u) => u.userid) });
    createTask(work, assigned);
    // console.log(assigned);
  };

  const viewModel = (el) => {
    // alert(id);
    setOpen(true);
    setData(el);
    console.log(el);
  };

  return (
    <div className="App ">
      <div className="w-full">
        <AppBarComp />
        <TaskModel
          open={open}
          setOpen={setOpen}
          data={data}
          getTasks={getTasks}
        />

        <div style={{ display: "flex" }}>
          <div className="hidden sm:block bg-indigo-900 w-1/5 p-2 h-screen">
            <div style={{ display: "block" }}>
              <form className="max-w-[400px] w-full my-8 mx-auto bg-white p-8 px-8 pt-10 rounded-lg  space-y-8">
                <div className="vertical-align: middle">
                  <TextField
                    name="date"
                    type="text"
                    value={work.worknote}
                    placeholder="Description.."
                    onChange={(e) =>
                      setWork({ ...work, worknote: e.target.value })
                    }
                    variant="standard"
                    color="warning"
                    focused
                  />
                </div>
                <div>
                  <TextField
                    name="date"
                    type="date"
                    value={work.workdate}
                    placeholder="Date.."
                    onChange={(e) =>
                      setWork({ ...work, workdate: e.target.value })
                    }
                    variant="standard"
                    color="warning"
                    focused
                  />
                </div>
                <div>
                  <TextField
                    name="time"
                    type="time"
                    placeholder="Time"
                    value={work.worktime}
                    onChange={(e) =>
                      setWork({ ...work, worktime: e.target.value })
                    }
                    variant="standard"
                    color="warning"
                    focused
                  />
                </div>

                {JSON.parse(localStorage.getItem("user"))?.type == "admin" ? (
                  <div className="flex flex-col space-y-4 ...">
                    <TextField
                      type="text"
                      name="text"
                      placeholder="Assign to"
                      value={typingVal}
                      onChange={(e) => onAssignTyping(e)}
                      variant="standard"
                      color="warning"
                      focused
                    />
                    <div style={{ position: "absolute", background: "#fff" }}>
                      <div style={{ width: "100%" }}>
                        {userSuggested.map((item, index) => (
                          <div
                            className="text-purple-600 ..."
                            style={{ margin: "10px 0" }}
                            onClick={() =>
                              addToAssigned(item.name, item.userid)
                            }
                            key={index}
                          >
                            {item.name}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      {assignedUserList.length > 0 ? (
                        assignedUserList.map((item, index) => (
                          <div
                            onClick={() =>
                              removeAssigned(item.name, item.userid)
                            }
                            key={index}
                          >
                            {item.name}
                          </div>
                        ))
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <Button variant="contained" size="large" onClick={addItem}>
                  Add
                </Button>
              </form>
            </div>
          </div>

          <div style={{ display: "flex" }} className=" w-5/6 p-2 h-100">
            <DragDropContext onDragEnd={handleDragEnd}>
              {_.map(state, (data, key) => {
                return (
                  <div key={key} className={"column "}>
                    <h3>{data.title}</h3>
                    <Droppable droppableId={key}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={"droppable-col"}
                          >
                            {data.items.map((el, index) => {
                              return (
                                <Draggable
                                  key={el.id}
                                  index={index}
                                  draggableId={el.id + el.worktype}
                                >
                                  {(provided, snapshot) => {
                                    console.log(snapshot);
                                    return (
                                      <div
                                        onClick={() => viewModel(el)}
                                        className={`item ${
                                          snapshot.isDragging && "dragging"
                                        }`}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        {el.worknote}
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                );
              })}
            </DragDropContext>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
