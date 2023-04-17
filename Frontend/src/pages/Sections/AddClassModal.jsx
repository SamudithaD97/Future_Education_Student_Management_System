import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [subject, setSubject] = React.useState();
  const [classes, setClasses] = React.useState([]);
  const [selectedClass, setSelectedClass] = React.useState([]);
  const [noOfCredits, setNoOfCredits] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await axios.get(
      `http://localhost:8080/sclass/get-subjects`
    );
    setClasses(response.data);
  }

  const submit = async () => {
    props?.teacherId
      ? await axios
          .post("http://localhost:8080/sclass/create", {
            subject: subject,
            noOfCredits: noOfCredits,
          })
          .then(async (res) => {
            await axios
              .post(
                `http://localhost:8080/teacher/enroll?classId=${res.data.classId}&teacherId=${props?.teacherId}`
              )
              .then(async (res2) => {
                props.fetchData();
              });
          })
          .catch((err) => {
            alert("Failed Adding Class");
          })
      : await axios
          .post(
            `http://localhost:8080/student/enroll?classId=${selectedClass}&studentId=${props?.studentId}`
          )
          .then(async (res2) => {
            props.fetchData();
          })
          .catch((err) => {
            alert("Failed Adding Class");
          });
  };

  return (
    <div>
      <div className="flex justify-center group group/item w-[160px]">
        <a
          onClick={() => {
            handleClickOpen();
          }}
          style={{ width: "100%" }}
          className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 flex flex-col justify-between"
        >
          <div>
            <AddIcon />
            {props?.teacherId ? "Add Class" : "Enroll"}
          </div>
        </a>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {props?.teacherId ? "Create New Class" : "Enroll Classes"}
        </DialogTitle>
        {props?.teacherId ? (
          <DialogContent>
            <TextField
              autoFocus
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              margin="dense"
              id="subject"
              name="subject"
              label="Subject Name"
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              autoFocus
              margin="dense"
              value={noOfCredits}
              onChange={(e) => setNoOfCredits(e.target.value)}
              name="noOfCredits"
              id="name"
              label="No. of Credits"
              type="number"
              fullWidth
              variant="outlined"
            />
          </DialogContent>
        ) : (
          <DialogContent className="py-4">
            <FormControl style={{marginTop:'20px'}} className="w-[500px]">
              <InputLabel id="demo-simple-select-label">Select a Class</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedClass}
                label="Select a Class"
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                {classes.map((item) => (
                  <MenuItem value={item.classId}>{item.subject}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={() => handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              submit();
              handleClose();
            }}
          >
            {props?.teacherId ? "Create" : "Enroll"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
