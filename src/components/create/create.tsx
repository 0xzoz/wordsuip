
import React from "react";
import { Button, Box, Container, TextField } from '@mui/material';
import { WithContext as ReactTags } from 'react-tag-input';
import MDEditor, {
    commands,
    ICommand,
    TextState,
    TextAreaTextApi
  } from "@uiw/react-md-editor";
  import { Toolbar } from "./toolbar";

;

const Create = () => {
    const [value, setValue] = React.useState("**Hello world!!!**");
    const [tags, setTags] = React.useState<{ id: string; text: string; }[]>([]);
    
      const handleDelete = (i: number) => {
        setTags(tags.filter((tag, index) => index !== i));
      };
    
      const handleAddition = (tag: { id: string; text: string; }) => {
        setTags([...tags, tag]);
      };
    
      const handleDrag = (tag: { id: string; text: string; }, currPos: number, newPos: number) => {
        const newTags = tags.slice();
    
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
    
        // re-render
        setTags(newTags);
      };
    
      const handleTagClick = (index: number) => {
        console.log('The tag at index ' + index + ' was clicked');
      };

    return (
        <>
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
            <Container maxWidth={false}>
                <Toolbar />
                <Box sx={{ pt: 3 }}>
                    <TextField
                        fullWidth
                        helperText="Enter your title"
                        label="Title"
                        name="title"
                        // onChange={}
                        required
                        // value={}
                        variant="outlined"
                    />
                </Box>
                <Box sx={{ pt: 3 }}>
                    {false ?
                    <img width='100%' src="https://source.unsplash.com/random" alt="random" />
                    : 
                    <Button               
                    color="secondary"
                    component="a"
                    fullWidth
                    sx={{ mt: 2 }}
                    variant="contained" onClick={() => setValue("")}>Cover Image</Button>
                   }    
                    </Box>
                    <Box sx={{ pt: 3 }}>
                    <ReactTags
                        tags={tags}
                        handleDelete={handleDelete}
                        handleAddition={handleAddition}
                        handleDrag={handleDrag}
                        handleTagClick={handleTagClick}
                        inputFieldPosition="bottom"
                        autocomplete
                        />
                    </Box>
                <Box sx={{ pt: 3 }}>
                    <div data-color-mode="light">
                        <MDEditor
                        value={value}
                        onChange={(val) => {
                            setValue(val!);
                        }}
                        />
                    </div>
                </Box>
            </Container>
        </Box>
      </>
    );
}

export default Create;