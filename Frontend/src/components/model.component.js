import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { TextField } from "@mui/material";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal(props) {
  const { open, setOpen, getTasks, closeParent, data } = props;

  const [editData,setEditData] = React.useState(data)

  const handleClose = () => {
    setOpen(false);
    setEditData(data);
  };

  const updateTask = () =>{
    updateCall()
  }

  
  async function updateCall() {
    await axios
      .put(`http://localhost:8080/api/work/update/${data.id}`,editData)
      .then((res) => {
        handleClose();
        closeParent();
        getTasks();
      })
      .catch((err) => {
        alert("Update Error");
      });
  }

  return (
    <React.Fragment>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300 }}>
          <form className="max-w-[600px] w-full my-8 mx-auto bg-white p-8 px-8 pt-10 rounded-lg  space-y-8">
            <div className="vertical-align: middle">
              <TextField
                name="date"
                type="text"
                value={editData.worknote}
                placeholder="Description.."
                onChange={(e) => setEditData({ ...editData, worknote: e.target.value })}
                variant="standard"
                color="warning"
                focused
              />
            </div>
            <div>
              <TextField
                name="date"
                type="date"
                value={editData.workdate}
                placeholder="Date.."
                onChange={(e) => setEditData({ ...editData, workdate: e.target.value })}
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
                value={editData.worktime}
                onChange={(e) => setEditData({ ...editData, worktime: e.target.value })}
                variant="standard"
                color="warning"
                focused
              />
            </div>
          </form>
          <Button variant="contained" size="medium" onClick={updateTask}>
            Update
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function TaskModel(prop) {
  const { open, setOpen, data, getTasks } = prop;
  const [openEdit, setOpenEdit] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const deleteTask = () => {
    deleteCall();
  };

  async function deleteCall() {
    await axios
      .delete(`http://localhost:8080/api/work/delete/${data.id}`)
      .then((res) => {
        handleClose();
        getTasks();
      })
      .catch((err) => {
        alert("Delete Error");
      });
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400,pt:4 }}>
          <small style={{color:"rgb(0 74 255)"}}>Created By {data?.user?.name} on {data?.createDate}</small>
          <h2 style={{padding:'10px 0'}} id="parent-modal-title">{data?.worknote}</h2>
          <p id="parent-modal-description">
            <small>
              Complete by {data?.workdate} at {data?.worktime}
            </small>
          </p>
          <Button onClick={() => setOpenEdit(true)}>
            <EditIcon />
          </Button>
          <Button onClick={deleteTask}>
            <DeleteIcon />
          </Button>
          <ChildModal
            data={data}
            open={openEdit}
            setOpen={setOpenEdit}
            getTasks={getTasks}
            closeParent={handleClose}
          />
        </Box>
      </Modal>
    </div>
  );
}
