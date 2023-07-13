import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { addFileToCollection, createCollection } from "../api/collections";
import { CollectionModelSchema } from "../types";

type CollectionInsertDocumentProps = {
  open: boolean;
  authToken: string;
  handleClose: () => void;
  handleCreate: () => void;
  selectedCollection: CollectionModelSchema | undefined;
};

const CollectionInsertDocument = ({
  open,
  authToken,
  handleClose,
  handleCreate,
  selectedCollection,
}: CollectionInsertDocumentProps) => {
  const [error, setError] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [files, setFiles] = useState<FileList | null>(null);

  console.log("Authtoken", authToken);

  const handleSubmit = async (data: any) => {
    console.log("submit data", data);
    try {
      if (selectedCollection && files) {
        await addFileToCollection(selectedCollection?.id, files, authToken)
          .catch((e) => {
            toast.error(`Unable to create collection due to error: ${e}`);
          })
          .then((response) => {
            toast.success("Collection successfully submitted for processing!");
          });
      }

      // await createCollection(
      //   {
      //     title: title,
      //     description: description,
      //   },
      //   files,
      //   authToken
      // )
      //   .catch((e) => {
      //     toast.error(`Unable to create collection due to error: ${e}`);
      //   })
      //   .then((response) => {
      //     toast.success("Collection successfully submitted for processing!");
      //   });

      handleCreate();
    } catch (error: any) {
      setError(error.message);
    }
    handleClose();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Insert Document to Collection</DialogTitle>
      <DialogContent>
        {/* <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        /> */}
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          style={{ display: "block", marginTop: 16 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CollectionInsertDocument;
