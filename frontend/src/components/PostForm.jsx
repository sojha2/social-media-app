import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

const PostForm = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen}>Create Post</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          component="form"
          sx={{
            p: 2,
            width: "50%",
            borderRadius: "2rem",
            backgroundColor: "background.postForm",
          }}
        >
          <Typography variant="h4" component="p">
            Create Post
          </Typography>
          <FormControl variant="standard" fullWidth sx={{ mt: 2 }}>
            <TextField
              helperText="Please provide a post title"
              label="Title"
              id="form-post-title"
              fullWidth
            />
          </FormControl>
          <FormControl variant="standard" fullWidth sx={{ mt: 2 }}>
            <TextField
              helperText="Please provide post content"
              label="Content"
              id="form-post-content"
              fullWidth
            />
          </FormControl>
          <Button
            variant="contained"
            sx={{
              display: "block",
              ml: "auto",
              width: "7rem",
              backgroundColor: "#06D6A0",
            }}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default PostForm;
